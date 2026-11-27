import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PRINT_SCOPES, getOniRankInfo } from '../src/data.ts';
import { buildOniQuestion, filterPairItems, filterSheetItems, isBonusCombo } from '../src/game-logic.ts';
import { createMemoryStore, createProgressStore } from '../src/storage.ts';

describe('biology-anki-dojo data & logic', () => {
    it('SHEET_ITEMS (>=4) and PAIR_ITEMS (>=3) cover prints 1 to 4', () => {
        for (const no of PRINT_SCOPES) {
            assert.ok(filterSheetItems(no).length >= 4, `sheet print ${no} should have >=4 items`);
            assert.ok(filterPairItems(no).length >= 3, `pair print ${no} should have >=3 items`);
        }
    });

    it('buildOniQuestion produces 3 choices across all scopes without repeating prevAnswer', () => {
        for (const cat of ['sheet', 'pair'] as const) {
            let prev: string | null = null;
            for (let i = 0; i < 6; i++) {
                const q = buildOniQuestion(cat, prev);
                assert.equal(q.choices.length, 3);
                assert.ok(q.choices.some((c) => c.answer === q.correctAnswer));
                if (prev !== null) {
                    assert.notEqual(q.correctAnswer, prev);
                }
                prev = q.correctAnswer;
            }
        }
    });

    it('progress store unlocks oni only after all 4 scopes are cleared per category', () => {
        const progress = createProgressStore(createMemoryStore());
        assert.equal(progress.isOniUnlocked('sheet'), false);
        assert.equal(progress.getClearedScopeCount('sheet'), 0);

        progress.markScopeCleared('sheet', '1');
        progress.markScopeCleared('sheet', '2');
        progress.markScopeCleared('sheet', '3');
        assert.equal(progress.getClearedScopeCount('sheet'), 3);
        assert.equal(progress.isOniUnlocked('sheet'), false);

        progress.markScopeCleared('sheet', '4');
        assert.equal(progress.getClearedScopeCount('sheet'), 4);
        assert.equal(progress.isOniUnlocked('sheet'), true);
        assert.equal(progress.isOniUnlocked('pair'), false);
    });

    it('rank thresholds & bonus combo', () => {
        assert.equal(getOniRankInfo(20).rank, 'S');
        assert.equal(getOniRankInfo(14).rank, 'A');
        assert.equal(getOniRankInfo(8).rank, 'B');
        assert.equal(getOniRankInfo(0).rank, 'C');
        assert.equal(isBonusCombo(5), true);
        assert.equal(isBonusCombo(4), false);
    });
});

describe('DOM & index.html integrity', () => {
    const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
    const html = readFileSync(join(rootDir, 'index.html'), 'utf8');
    const appTs = readFileSync(join(rootDir, 'src/app.ts'), 'utf8');

    it('every byId(...) in src/app.ts exists in index.html, no "all" scope, and cache-busters match', () => {
        assert.equal(html.includes('value="all"'), false);
        for (const m of appTs.matchAll(/byId(?:<[^>]+>)?\('([^']+)'\)/g)) {
            assert.ok(html.includes(`id="${m[1]}"`), `Missing id="${m[1]}"`);
        }
        const cssMatch = html.match(/href="css\/style\.css\?v=([^"]+)"/);
        const jsMatch = html.match(/<script type="module" src="js\/app\.js\?v=([^"]+)"><\/script>/);
        assert.equal(cssMatch?.[1], jsMatch?.[1]);
    });
});
