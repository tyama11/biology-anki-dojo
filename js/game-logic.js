import { PAIR_ITEMS, SHEET_ITEMS } from './data.js';
import { pickRandom, shuffled,          } from './random.js';
                                                                                        

export const ONI_TIME_LIMIT = 60;
export const ONI_PENALTY_SECONDS = 5;
export const ONI_COMBO_STEP = 5;
export const ONI_BONUS_SECONDS = 3;
export const ONI_TRAY_SIZE = 3;

export function filterSheetItems(scope            )                       {
    return scope === 'all' ? SHEET_ITEMS : SHEET_ITEMS.filter((item) => item.printNo === scope);
}

export function filterPairItems(scope            )                      {
    if (scope === 'all') return PAIR_ITEMS;
    const filtered = PAIR_ITEMS.filter((item) => item.printNo === scope);
    return filtered.length > 0 ? filtered : PAIR_ITEMS;
}

                              
                                  
                                   
                                   
 

export function buildOniQuestion(
    category          ,
    scope            ,
    prevAnswer               ,
    rng      = Math.random
)              {
    if (category === 'pair') {
        const pool = filterPairItems(scope);
        const candidates = pool.filter((p) => p.termA !== prevAnswer && p.termB !== prevAnswer);
        const targetPair = pickRandom(candidates.length > 0 ? candidates : pool, rng);
        const askA = rng() < 0.5;
        const correctTerm = askA ? targetPair.termA : targetPair.termB;
        const otherTerm = askA ? targetPair.termB : targetPair.termA;
        const promptDesc = askA ? targetPair.descA : targetPair.descB;

        const extraTerms = shuffled(
            PAIR_ITEMS.filter((p) => p.id !== targetPair.id).flatMap((p) => [p.termA, p.termB]),
            rng
        );
        const thirdTerm = extraTerms.find((t) => t !== correctTerm && t !== otherTerm) ?? '恒常性';

        const choices               = shuffled(
            [
                { id: 'c0', answer: correctTerm, label: correctTerm, hint: '' },
                { id: 'c1', answer: otherTerm, label: otherTerm, hint: '' },
                { id: 'c2', answer: thirdTerm, label: thirdTerm, hint: '' }
            ],
            rng
        );

        return {
            questionHtml: `<div class="dojo-q-badge">⚖️ ${targetPair.pairTitle}</div><div class="dojo-q-text">${promptDesc}</div>`,
            correctAnswer: correctTerm,
            choices
        };
    }

    const pool = filterSheetItems(scope);
    const candidates = pool.filter((s) => s.answer !== prevAnswer);
    const target = pickRandom(candidates.length > 0 ? candidates : pool, rng);

    const distractors = shuffled(
        SHEET_ITEMS.filter((s) => s.answer !== target.answer).map((s) => s.answer),
        rng
    ).slice(0, ONI_TRAY_SIZE - 1);

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
        questionHtml: `<div class="dojo-q-badge">No.${target.printNo} ${target.section}</div><div class="dojo-q-text">${target.before}<span class="oni-blank-pill">？</span>${target.after}</div>`,
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