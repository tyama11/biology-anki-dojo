import { PRINT_SCOPES } from './data.ts';
import type { Category, PrintScope } from './types.ts';

/** localStorage と同じ最小インターフェース（テストではメモリ実装を使う） */
export interface KeyValueStore {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

export const MUTE_STORAGE_KEY = 'biology-anki-dojo-muted';

export function oniBestKey(category: Category): string {
    return `biology-anki-dojo-oni-best-${category}`;
}

export function scopeClearedKey(category: Category, scope: PrintScope): string {
    return `biology-anki-dojo-cleared-${category}-${scope}`;
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
    getOniBest(category: Category): number | null;
    setOniBest(category: Category, score: number): void;
    isScopeCleared(category: Category, scope: PrintScope): boolean;
    markScopeCleared(category: Category, scope: PrintScope): void;
    getClearedScopeCount(category: Category): number;
    isOniUnlocked(category: Category): boolean;
}

export function createProgressStore(store: KeyValueStore): ProgressStore {
    return {
        getOniBest(category) {
            const raw = store.getItem(oniBestKey(category));
            if (raw === null) return null;
            const value = Number(raw);
            return Number.isFinite(value) && value >= 0 ? Math.floor(value) : null;
        },
        setOniBest(category, score) {
            store.setItem(oniBestKey(category), String(score));
        },
        isScopeCleared(category, scope) {
            return store.getItem(scopeClearedKey(category, scope)) === 'true';
        },
        markScopeCleared(category, scope) {
            store.setItem(scopeClearedKey(category, scope), 'true');
        },
        getClearedScopeCount(category) {
            return PRINT_SCOPES.filter((scope) => store.getItem(scopeClearedKey(category, scope)) === 'true').length;
        },
        isOniUnlocked(category) {
            return PRINT_SCOPES.every((scope) => store.getItem(scopeClearedKey(category, scope)) === 'true');
        }
    };
}
