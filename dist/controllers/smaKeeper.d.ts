import { SlidingWindowArr } from 'sliding-window-arr';
export declare namespace SmaKeeper {
    interface Options {
        period: number;
    }
}
export declare class SmaKeeper {
    private period;
    private historyValues;
    private currentSma;
    constructor(options: SmaKeeper.Options);
    add(val: number): void;
    getValues(): SlidingWindowArr<number>;
    get(): number;
    length(): number;
    getPeriod(): number;
}
