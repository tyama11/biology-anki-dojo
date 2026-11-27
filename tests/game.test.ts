import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PRINT_SCOPES, getOniRankInfo } from '../src/data.ts';
import {
    ONI_PENALTY_SECONDS,
    buildOniQuestion,
    filterPairItems,
    filterSheetItems,
    isBonusCombo,
} from '../src/game-logic.ts';
import { createMemoryStore, createProgressStore } from '../src/storage.ts';
import type { OniQuestionFormat } from '../src/types.ts';

describe('biology-anki-dojo data & logic', () => {
    it('SHEET_ITEMS (>=4) and PAIR_ITEMS (>=3) cover prints 1 to 4', () => {
        for (const no of PRINT_SCOPES) {
            assert.ok(filterSheetItems(no).length >= 4, `sheet print ${no} should have >=4 items`);
            assert.ok(filterPairItems(no).length >= 3, `pair print ${no} should have >=3 items`);
        }
    });

    it('buildOniQuestion covers all 5 formats, 2-3 choices, no repeat of prevAnswer, and concise text', () => {
        const seenFormats = new Set<OniQuestionFormat>();
        let prev: string | null = null;
        let seed = 12345;
        const rng = () => {
            seed = (seed * 1664525 + 1013904223) >>> 0;
            return seed / 0x100000000;
        };

        for (let i = 0; i < 80; i++) {
            const q = buildOniQuestion(prev, rng);
            seenFormats.add(q.format);

            const expectedChoices = q.format === 'true-false' ? 2 : 3;
            assert.equal(q.choices.length, expectedChoices, `format ${q.format} should have ${expectedChoices} choices`);
            assert.ok(q.choices.some((c) => c.answer === q.correctAnswer));
            if (prev !== null) {
                assert.notEqual(q.correctAnswer, prev);
            }
            for (const c of q.choices) {
                assert.ok(c.label.length > 0 && c.label.length <= 45, `choice label too long: ${c.label}`);
            }
            prev = q.correctAnswer;
        }

        const expectedFormats: OniQuestionFormat[] = [
            'blank',
            'pair-term',
            'true-false',
            'reverse-desc',
            'odd-one-out',
        ];
        for (const fmt of expectedFormats) {
            assert.ok(seenFormats.has(fmt), `missing oni format: ${fmt}`);
        }
    });

    it('progress store tracks all 16 stages individually and unlocks oni only at 16/16', () => {
        const progress = createProgressStore(createMemoryStore());
        assert.equal(progress.getTotalClearedCount(), 0);
        assert.equal(progress.isOniUnlocked(), false);

        let cleared = 0;
        for (const cat of ['sheet', 'pair'] as const) {
            for (const scope of PRINT_SCOPES) {
                for (const diff of ['easy', 'normal'] as const) {
                    assert.equal(progress.isStageCleared(cat, scope, diff), false);
                    progress.markStageCleared(cat, scope, diff);
                    cleared += 1;
                    assert.equal(progress.isStageCleared(cat, scope, diff), true);
                    assert.equal(progress.getTotalClearedCount(), cleared);
                    assert.equal(progress.isOniUnlocked(), cleared === 16);
                }
            }
            assert.equal(progress.getCategoryClearedCount(cat), 8);
        }

        assert.equal(progress.getOniBest(), null);
        progress.setOniBest(12);
        assert.equal(progress.getOniBest(), 12);
    });

    it('rank thresholds (14/10/6/0), ONI_PENALTY_SECONDS === 3, and bonus combo', () => {
        assert.equal(ONI_PENALTY_SECONDS, 3);
        assert.equal(getOniRankInfo(14).rank, 'S');
        assert.equal(getOniRankInfo(13).rank, 'A');
        assert.equal(getOniRankInfo(10).rank, 'A');
        assert.equal(getOniRankInfo(9).rank, 'B');
        assert.equal(getOniRankInfo(6).rank, 'B');
        assert.equal(getOniRankInfo(5).rank, 'C');
        assert.equal(getOniRankInfo(0).rank, 'C');
        assert.equal(isBonusCombo(5), true);
        assert.equal(isBonusCombo(4), false);
    });
});

describe('DOM & index.html integrity', () => {
    const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
    const html = readFileSync(join(rootDir, 'index.html'), 'utf8');
    const appTs = readFileSync(join(rootDir, 'src/app.ts'), 'utf8');

    it('3-tab DOM integrity, no "all" scope, #tab-oni hidden initially, every byId exists, and cache-busters match', () => {
        assert.equal(html.includes('value="all"'), false);
        assert.match(html, /id="tab-oni"[^>]*hidden/);
        for (const tab of ['sheet', 'pair', 'oni']) {
            assert.ok(html.includes(`data-tab="${tab}"`), `Missing tab data-tab="${tab}"`);
        }
        for (const m of appTs.matchAll(/byId(?:<[^>]+>)?\('([^']+)'\)/g)) {
            assert.ok(html.includes(`id="${m[1]}"`), `Missing id="${m[1]}"`);
        }
        const cssMatch = html.match(/href="css\/style\.css\?v=([^"]+)"/);
        const jsMatch = html.match(/<script type="module" src="js\/app\.js\?v=([^"]+)"><\/script>/);
        assert.ok(cssMatch?.[1], 'Missing css cache-buster');
        assert.equal(cssMatch?.[1], jsMatch?.[1]);
    });
});
