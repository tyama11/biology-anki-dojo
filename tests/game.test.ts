import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PAIR_ITEMS, SHEET_ITEMS, getOniRankInfo } from '../src/data.ts';
import { buildOniQuestion, filterPairItems, filterSheetItems, isBonusCombo } from '../src/game-logic.ts';

describe('biology-anki-dojo data & logic', () => {
    it('SHEET_ITEMS and PAIR_ITEMS cover prints 1 to 4', () => {
        for (const no of ['1', '2', '3', '4'] as const) {
            assert.ok(filterSheetItems(no).length > 0);
            assert.ok(filterPairItems(no).length > 0);
        }
        assert.equal(filterSheetItems('all').length, SHEET_ITEMS.length);
        assert.equal(filterPairItems('all').length, PAIR_ITEMS.length);
    });

    it('buildOniQuestion produces 3 choices including the correct answer', () => {
        const qSheet = buildOniQuestion('sheet', 'all', null);
        assert.equal(qSheet.choices.length, 3);
        assert.ok(qSheet.choices.some((c) => c.answer === qSheet.correctAnswer));

        const qPair = buildOniQuestion('pair', 'all', null);
        assert.equal(qPair.choices.length, 3);
        assert.ok(qPair.choices.some((c) => c.answer === qPair.correctAnswer));
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

    it('every byId(...) in src/app.ts exists in index.html and cache-busters match', () => {
        for (const m of appTs.matchAll(/byId(?:<[^>]+>)?\('([^']+)'\)/g)) {
            assert.ok(html.includes(`id="${m[1]}"`), `Missing id="${m[1]}"`);
        }
        const cssMatch = html.match(/href="css\/style\.css\?v=([^"]+)"/);
        const jsMatch = html.match(/<script type="module" src="js\/app\.js\?v=([^"]+)"><\/script>/);
        assert.equal(cssMatch?.[1], jsMatch?.[1]);
    });
});
