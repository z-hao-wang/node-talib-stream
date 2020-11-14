export declare namespace StdKeeper {
    interface Options {
        period: number;
    }
}
export declare class StdKeeper {
    private period;
    private std;
    private s1;
    private s2;
    private squareSum;
    private historyValues;
    private smaKeeper;
    constructor(options: StdKeeper.Options);
    static average(values: number[]): number;
    static standardDeviation(values: number[], limit?: number): number;
    add(val: number): void;
    get(): number;
    length(): number;
    getPeriod(): number;
}
