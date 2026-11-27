import { DECOY_CARDS_BY_SCOPE, ODD_ONE_OUT_ITEMS, PAIR_ITEMS, SHEET_ITEMS, TRICKY_DECOYS, TRUE_FALSE_ITEMS } from './data.js';
import { pickRandom, shuffled,          } from './random.js';
                                                                                                                            

export const ONI_TIME_LIMIT = 60;
export const ONI_PENALTY_SECONDS = 3;
export const ONI_COMBO_STEP = 5;
export const ONI_BONUS_SECONDS = 3;
export const ONI_TRAY_SIZE = 3;

export function filterSheetItems(scope            )                       {
    return SHEET_ITEMS.filter((item) => item.printNo === scope);
}

export function filterPairItems(scope            )                      {
    return PAIR_ITEMS.filter((item) => item.printNo === scope);
}

export function buildStandardChoices(
    category          ,
    scope            ,
    difficulty                 ,
    rng      = Math.random
)               {
    const baseChoices               = category === 'sheet'
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

    const decoyChoices               = decoyPool.map((d, idx) => ({
        id: `decoy-${scope}-${idx}`,
        answer: d.label,
        label: d.label,
        hint: difficulty === 'easy' ? d.hint : ''
    }));

    return shuffled([...baseChoices, ...decoyChoices], rng);
}

                              
                                       
                                  
                                   
                                   
 

const ONI_FORMATS                               = [
    'blank',
    'pair-term',
    'true-false',
    'reverse-desc',
    'odd-one-out'
];

export function buildOniQuestion(
    prevAnswer               ,
    rng      = Math.random
)              {
    const format = pickRandom(ONI_FORMATS, rng);

    if (format === 'pair-term') {
        const candidates = PAIR_ITEMS.filter((p) => p.termA !== prevAnswer && p.termB !== prevAnswer);
        const targetPair = pickRandom(candidates.length > 0 ? candidates : PAIR_ITEMS, rng);
        const askA = rng() < 0.5;
        const correctTerm = askA ? targetPair.termA : targetPair.termB;
        const otherTerm = askA ? targetPair.termB : targetPair.termA;
        const promptDesc = askA ? targetPair.shortDescA : targetPair.shortDescB;

        const trickyPool = [
            ...(TRICKY_DECOYS[correctTerm] ?? []),
            ...DECOY_CARDS_BY_SCOPE[targetPair.printNo].map((d) => d.label)
        ].filter((t) => t !== correctTerm && t !== otherTerm);

        const extraTerms = shuffled(
            PAIR_ITEMS.filter((p) => p.id !== targetPair.id).flatMap((p) => [p.termA, p.termB]),
            rng
        );
        const thirdTerm = (trickyPool.length > 0 ? pickRandom(trickyPool, rng) : undefined)
            ?? extraTerms.find((t) => t !== correctTerm && t !== otherTerm)
            ?? '恒常性';

        const choices               = shuffled(
            [correctTerm, otherTerm, thirdTerm].map((term, idx) => ({
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

    if (format === 'true-false') {
        const candidates = TRUE_FALSE_ITEMS.filter((item) => {
            const ans = item.isTrue ? '⭕ 正しい' : '❌ 誤り';
            return ans !== prevAnswer;
        });
        const target = pickRandom(candidates.length > 0 ? candidates : TRUE_FALSE_ITEMS, rng);
        const correctAnswer = target.isTrue ? '⭕ 正しい' : '❌ 誤り';

        return {
            format,
            questionHtml: `<div class="dojo-q-badge">⭕❌ 正誤クイズ</div><div class="dojo-q-text">${target.statement}</div>`,
            correctAnswer,
            choices: [
                { id: 'c0', answer: '⭕ 正しい', label: '⭕ 正しい', hint: '' },
                { id: 'c1', answer: '❌ 誤り', label: '❌ 誤り', hint: '' }
            ]
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

        const choices               = shuffled(
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

        const choices               = shuffled(
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

    const distractorPool           = [];
    for (const candidate of [...tricky, ...shuffled(scopeDecoys, rng), ...shuffled(sameScopeAnswers, rng), ...shuffled(allAnswers, rng)]) {
        if (candidate !== target.answer && !distractorPool.includes(candidate)) {
            distractorPool.push(candidate);
            if (distractorPool.length >= ONI_TRAY_SIZE - 1) break;
        }
    }
    const distractors = distractorPool.slice(0, ONI_TRAY_SIZE - 1);

    const choices               = shuffled(
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

export function computeRemainingSeconds(endTimeMs        , nowMs        )         {
    return Math.ceil(Math.max(0, endTimeMs - nowMs) / 1000);
}

export function isBonusCombo(combo        )          {
    return combo > 0 && combo % ONI_COMBO_STEP === 0;
}


//# sourceURL=game-logic.ts