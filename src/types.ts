export type Category = 'sheet' | 'pair';
export type TabId = 'sheet' | 'pair' | 'oni';
export type Difficulty = 'easy' | 'normal' | 'oni';
export type StageDifficulty = 'easy' | 'normal';
export type PrintScope = '1' | '2' | '3' | '4';
export type OniQuestionFormat = 'blank' | 'pair-term' | 'true-false' | 'reverse-desc' | 'odd-one-out';

export interface SheetItem {
    readonly id: string;
    readonly printNo: '1' | '2' | '3' | '4';
    readonly section: string;
    readonly before: string;
    readonly answer: string;
    readonly after: string;
    readonly hint: string;
}

export interface PairItem {
    readonly id: string;
    readonly printNo: '1' | '2' | '3' | '4';
    readonly pairTitle: string;
    readonly termA: string;
    readonly descA: string;
    readonly shortDescA: string;
    readonly termB: string;
    readonly descB: string;
    readonly shortDescB: string;
}

export interface TrueFalseItem {
    readonly id: string;
    readonly printNo: PrintScope;
    readonly statement: string;
    readonly isTrue: boolean;
}

export interface OddOneOutItem {
    readonly id: string;
    readonly printNo: PrintScope;
    readonly prompt: string;
    readonly oddOne: string;
    readonly mates: readonly [string, string];
}

export interface DojoChoice {
    readonly id: string;
    readonly answer: string;
    readonly label: string;
    readonly hint: string;
}

export type RankLetter = 'S' | 'A' | 'B' | 'C';

export interface RankInfo {
    readonly rank: RankLetter;
    readonly icon: string;
    readonly title: string;
    readonly className: 'rank-s' | 'rank-a' | 'rank-b' | 'rank-c';
}
