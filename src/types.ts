export type Category = 'sheet' | 'pair';
export type Difficulty = 'easy' | 'normal' | 'oni';
export type PrintScope = '1' | '2' | '3' | '4' | 'all';

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
    readonly termB: string;
    readonly descB: string;
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
