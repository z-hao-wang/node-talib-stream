import { SlidingWindowArr } from './slidingWindowArr';
export declare class RsiKeeper {
    period: number;
    prevGain: SlidingWindowArr;
    prevLoss: SlidingWindowArr;
    lastPrice: number;
    rsi: number;
    dataLen: number;
    prevAvgGain: number;
    prevAvgLoss: number;
    constructor(options: {
        periods: number;
    });
    add(price: number): void;
    get(): number;
}
