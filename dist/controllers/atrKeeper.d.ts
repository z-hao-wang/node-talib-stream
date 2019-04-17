import { SlidingWindowArr } from './slidingWindowArr';
export declare class AtrKeeper {
    period: number;
    high: SlidingWindowArr;
    low: SlidingWindowArr;
    close: SlidingWindowArr;
    atr: number;
    dataLen: number;
    previousTr: number[];
    constructor(options: {
        periods: number;
    });
    protected getTr(): number;
    add({ high, low, close }: {
        high: number;
        low: number;
        close: number;
    }): void;
    get(): number;
}
