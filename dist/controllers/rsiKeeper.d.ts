import { SlidingWindowArr } from 'sliding-window-arr';
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
        period: number;
    });
    add(price: number): void;
    get(): number;
}
