import { PRINT_SCOPES } from './data.ts';
import type { Category, PrintScope, StageDifficulty } from './types.ts';

/** localStorage と同じ最小インターフェース（テストではメモリ実装を使う） */
export interface KeyValueStore {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

export const MUTE_STORAGE_KEY = 'biology-anki-dojo-muted';
export const ONI_BEST_KEY = 'biology-anki-dojo-oni-best';

export const STAGE_DIFFICULTIES: readonly StageDifficulty[] = ['easy', 'normal'];
export const STAGE_CATEGORIES: readonly Category[] = ['sheet', 'pair'];

export function stageClearedKey(
    category: Category,
    scope: PrintScope,
    difficulty: StageDifficulty
): string {
    return `biology-anki-dojo-stage-cleared-${category}-${scope}-${difficulty}`;
}

export function createMemoryStore(initial: Record<string, string> = {}): KeyValueStore {
    const map = new Map<string, string>(Object.entries(initial));
    return {
        getItem: (key) => map.get(key) ?? null,
        setItem: (key, value) => {
            map.set(key, value);
        }
    };
}

/** プライベートモード等で localStorage が使えない場合はメモリに退避 */
export function safeLocalStorage(): KeyValueStore {
    try {
        const probeKey = '__mitosis_probe__';
        globalThis.localStorage.setItem(probeKey, '1');
        globalThis.localStorage.removeItem(probeKey);
        return globalThis.localStorage;
    } catch {
        return createMemoryStore();
    }
}

export interface ProgressStore {
    getOniBest(): number | null;
    setOniBest(score: number): void;
    isStageCleared(category: Category, scope: PrintScope, difficulty: StageDifficulty): boolean;
    markStageCleared(category: Category, scope: PrintScope, difficulty: StageDifficulty): void;
    getCategoryClearedCount(category: Category): number;
    getTotalClearedCount(): number;
    isOniUnlocked(): boolean;
}

export function createProgressStore(store: KeyValueStore): ProgressStore {
    return {
        getOniBest() {
            const raw = store.getItem(ONI_BEST_KEY);
            if (raw === null) return null;
            const value = Number(raw);
            return Number.isFinite(value) && value >= 0 ? Math.floor(value) : null;
        },
        setOniBest(score) {
            store.setItem(ONI_BEST_KEY, String(score));
        },
        isStageCleared(category, scope, difficulty) {
            return store.getItem(stageClearedKey(category, scope, difficulty)) === 'true';
        },
        markStageCleared(category, scope, difficulty) {
            store.setItem(stageClearedKey(category, scope, difficulty), 'true');
        },
        getCategoryClearedCount(category) {
            let count = 0;
            for (const scope of PRINT_SCOPES) {
                for (const difficulty of STAGE_DIFFICULTIES) {
                    if (store.getItem(stageClearedKey(category, scope, difficulty)) === 'true') {
                        count += 1;
                    }
                }
            }
            return count;
        },
        getTotalClearedCount() {
            return STAGE_CATEGORIES.reduce(
                (sum, category) => sum + this.getCategoryClearedCount(category),
                0
            );
        },
        isOniUnlocked() {
            return this.getTotalClearedCount() === PRINT_SCOPES.length * STAGE_DIFFICULTIES.length * STAGE_CATEGORIES.length;
        }
    };
}
