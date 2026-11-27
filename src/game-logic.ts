import { DECOY_CARDS_BY_SCOPE, DIAGRAM_ITEMS, ERROR_FIX_ITEMS, ODD_ONE_OUT_ITEMS, PAIR_ITEMS, SHEET_ITEMS, TRICKY_DECOYS } from './data.ts';
import { pickRandom, shuffled, type Rng } from './random.ts';
import type { Category, DojoChoice, OniQuestionFormat, PairItem, PrintScope, SheetItem, StageDifficulty } from './types.ts';

export const ONI_TIME_LIMIT = 60;
export const ONI_PENALTY_SECONDS = 5;
export const ONI_COMBO_STEP = 5;
export const ONI_BONUS_SECONDS = 3;
export const ONI_TRAY_SIZE = 4;

export function filterSheetItems(scope: PrintScope): readonly SheetItem[] {
    return SHEET_ITEMS.filter((item) => item.printNo === scope);
}

export function filterPairItems(scope: PrintScope): readonly PairItem[] {
    return PAIR_ITEMS.filter((item) => item.printNo === scope);
}

export function buildStandardChoices(
    category: Category,
    scope: PrintScope,
    difficulty: StageDifficulty,
    rng: Rng = Math.random
): DojoChoice[] {
    const baseChoices: DojoChoice[] = category === 'sheet'
        ? filterSheetItems(scope).map((s) => ({
            id: s.id,
            answer: s.answer,
            label: s.answer,
            hint: difficulty === 'easy' ? s.hint : ''
        }))
        : filterPairItems(scope).flatMap((p) => [
            { id: `${p.id}-a`, answer: p.termA, label: p.termA, hint: difficulty === 'easy' ? p.descA : '' },
            { id: `${p.id}-b`, answer: p.termB, label: p.termB, hint: difficulty === 'easy' ? p.descB : '' }
        ]);

    if (category === 'sheet' && difficulty === 'easy') {
        return shuffled(baseChoices, rng);
    }

    const decoyCount = category === 'pair' && difficulty === 'normal' ? 3 : 2;
    const existingLabels = new Set(baseChoices.map((c) => c.label));
    const decoyPool = shuffled(
        DECOY_CARDS_BY_SCOPE[scope].filter((d) => !existingLabels.has(d.label)),
        rng
    ).slice(0, decoyCount);

    const decoyChoices: DojoChoice[] = decoyPool.map((d, idx) => ({
        id: `decoy-${scope}-${idx}`,
        answer: d.label,
        label: d.label,
        hint: difficulty === 'easy' ? d.hint : ''
    }));

    return shuffled([...baseChoices, ...decoyChoices], rng);
}

export interface OniQuestion {
    readonly format: OniQuestionFormat;
    readonly questionHtml: string;
    readonly correctAnswer: string;
    readonly choices: DojoChoice[];
}

const ONI_FORMATS: readonly OniQuestionFormat[] = [
    'diagram-slot',
    'diagram-slot',
    'diagram-slot',
    'diagram-slot',
    'blank',
    'pair-term',
    'error-fix',
    'reverse-desc',
    'odd-one-out'
];

export function buildOniQuestion(
    prevAnswer: string | null,
    rng: Rng = Math.random
): OniQuestion {
    const format = pickRandom(ONI_FORMATS, rng);

    if (format === 'diagram-slot') {
        const candidates = DIAGRAM_ITEMS.filter((item) => item.slots.some((s) => s.answer !== prevAnswer));
        const target = pickRandom(candidates.length > 0 ? candidates : DIAGRAM_ITEMS, rng);
        const validSlots = target.slots.filter((s) => s.answer !== prevAnswer);
        const slot = pickRandom(validSlots.length > 0 ? validSlots : target.slots, rng);
        const choices: DojoChoice[] = shuffled(
            [slot.answer, ...slot.distractors].map((ans, idx) => ({
                id: `c${idx}`,
                answer: ans,
                label: ans,
                hint: ''
            })),
            rng
        );

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">🖼️ 図解あてはめ：${target.title}</div><div class="dojo-oni-svg-wrap">${slot.renderSvg()}</div>`,
            correctAnswer: slot.answer,
            choices
        };
    }

    if (format === 'pair-term') {
        const candidates = PAIR_ITEMS.filter((p) => p.termA !== prevAnswer && p.termB !== prevAnswer);
        const targetPair = pickRandom(candidates.length > 0 ? candidates : PAIR_ITEMS, rng);
        const askA = rng() < 0.5;
        const correctTerm = askA ? targetPair.termA : targetPair.termB;
        const otherTerm = askA ? targetPair.termB : targetPair.termA;
        const promptDesc = askA ? targetPair.shortDescA : targetPair.shortDescB;

        const trickyPool = shuffled(
            [
                ...(TRICKY_DECOYS[correctTerm] ?? []),
                ...DECOY_CARDS_BY_SCOPE[targetPair.printNo].map((d) => d.label),
                ...PAIR_ITEMS.filter((p) => p.id !== targetPair.id).flatMap((p) => [p.termA, p.termB])
            ],
            rng
        );
        const extras: string[] = [];
        for (const t of trickyPool) {
            if (t !== correctTerm && t !== otherTerm && !extras.includes(t)) {
                extras.push(t);
                if (extras.length >= ONI_TRAY_SIZE - 2) break;
            }
        }

        const choices: DojoChoice[] = shuffled(
            [correctTerm, otherTerm, ...extras].map((term, idx) => ({
                id: `c${idx}`,
                answer: term,
                label: term,
                hint: ''
            })),
            rng
        );

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">⚖️ ペア判別</div><div class="dojo-q-text">${promptDesc}</div>`,
            correctAnswer: correctTerm,
            choices
        };
    }

    if (format === 'error-fix') {
        const candidates = ERROR_FIX_ITEMS.filter((item) => item.correctTerm !== prevAnswer);
        const target = pickRandom(candidates.length > 0 ? candidates : ERROR_FIX_ITEMS, rng);
        const keepCorrect = rng() < 0.45 && prevAnswer !== '⭕ このまま正しい';
        const shownTerm = keepCorrect ? target.correctTerm : pickRandom(target.distractors, rng);
        const correctAnswer = keepCorrect ? '⭕ このまま正しい' : target.correctTerm;
        const extraDistractor = target.distractors.find((d) => d !== shownTerm) ?? target.distractors[0];
        const rawChoices = keepCorrect
            ? ['⭕ このまま正しい', target.distractors[0], target.distractors[1]]
            : ['⭕ このまま正しい', target.correctTerm, extraDistractor];

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">❌ 誤文訂正 / 正文判定</div><div class="dojo-q-text">${target.before}<span class="error-highlight">${shownTerm}</span>${target.after}</div>`,
            correctAnswer,
            choices: shuffled(rawChoices, rng).map((label, idx) => ({
                id: `c${idx}`,
                answer: label,
                label,
                hint: ''
            }))
        };
    }

    if (format === 'reverse-desc') {
        const candidates = PAIR_ITEMS.filter((p) => p.shortDescA !== prevAnswer && p.shortDescB !== prevAnswer);
        const targetPair = pickRandom(candidates.length > 0 ? candidates : PAIR_ITEMS, rng);
        const askA = rng() < 0.5;
        const promptTerm = askA ? targetPair.termA : targetPair.termB;
        const correctDesc = askA ? targetPair.shortDescA : targetPair.shortDescB;
        const otherDesc = askA ? targetPair.shortDescB : targetPair.shortDescA;

        const extraDescs = shuffled(
            PAIR_ITEMS.filter((p) => p.id !== targetPair.id).flatMap((p) => [p.shortDescA, p.shortDescB]),
            rng
        );
        const thirdDesc = extraDescs.find((d) => d !== correctDesc && d !== otherDesc) ?? '生体の恒常性を保つ働き';

        const choices: DojoChoice[] = shuffled(
            [correctDesc, otherDesc, thirdDesc].map((desc, idx) => ({
                id: `c${idx}`,
                answer: desc,
                label: desc,
                hint: ''
            })),
            rng
        );

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">🔄 用語→意味</div><div class="dojo-q-text">「${promptTerm}」の説明は？</div>`,
            correctAnswer: correctDesc,
            choices
        };
    }

    if (format === 'odd-one-out') {
        const candidates = ODD_ONE_OUT_ITEMS.filter((item) => item.oddOne !== prevAnswer);
        const target = pickRandom(candidates.length > 0 ? candidates : ODD_ONE_OUT_ITEMS, rng);

        const choices: DojoChoice[] = shuffled(
            [target.oddOne, ...target.mates].map((label, idx) => ({
                id: `c${idx}`,
                answer: label,
                label,
                hint: ''
            })),
            rng
        );

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">🚫 仲間はずれ</div><div class="dojo-q-text">${target.prompt}</div>`,
            correctAnswer: target.oddOne,
            choices
        };
    }

    // format === 'blank'
    const candidates = SHEET_ITEMS.filter((s) => s.answer !== prevAnswer);
    const target = pickRandom(candidates.length > 0 ? candidates : SHEET_ITEMS, rng);

    const tricky = TRICKY_DECOYS[target.answer] ?? [];
    const scopeDecoys = DECOY_CARDS_BY_SCOPE[target.printNo].map((d) => d.label);
    const sameScopeAnswers = filterSheetItems(target.printNo).map((s) => s.answer);
    const allAnswers = SHEET_ITEMS.map((s) => s.answer);

    const distractorPool: string[] = [];
    for (const candidate of [...tricky, ...shuffled(scopeDecoys, rng), ...shuffled(sameScopeAnswers, rng), ...shuffled(allAnswers, rng)]) {
        if (candidate !== target.answer && !distractorPool.includes(candidate)) {
            distractorPool.push(candidate);
            if (distractorPool.length >= ONI_TRAY_SIZE - 1) break;
        }
    }
    const distractors = distractorPool.slice(0, ONI_TRAY_SIZE - 1);

    const choices: DojoChoice[] = shuffled(
        [target.answer, ...distractors].map((ans, idx) => ({
            id: `c${idx}`,
            answer: ans,
            label: ans,
            hint: ''
        })),
        rng
    );

    return {
        format: 'blank',
        questionHtml: `<div class="dojo-q-badge">📝 穴埋め</div><div class="dojo-q-text">${target.before}<span class="oni-blank-pill">？</span>${target.after}</div>`,
        correctAnswer: target.answer,
        choices
    };
}

export function computeRemainingSeconds(endTimeMs: number, nowMs: number): number {
    return Math.ceil(Math.max(0, endTimeMs - nowMs) / 1000);
}

export function isBonusCombo(combo: number): boolean {
    return combo > 0 && combo % ONI_COMBO_STEP === 0;
}

const ANSWER_SYNONYM_GROUPS: ReadonlyArray<readonly string[]> = [
    ['アオコ', '青湖']
];

export function isAnswerMatch(given: string, expected: string): boolean {
    if (given === expected) return true;
    return ANSWER_SYNONYM_GROUPS.some((group) => group.includes(given) && group.includes(expected));
}
