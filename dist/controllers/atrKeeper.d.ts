import { SlidingWindowArr } from 'sliding-window-arr';
import { HLC } from '../types/sharedTypes';
export declare function getTr(high: number, low: number, prevClose: number): number;
export declare class AtrKeeper {
    period: number;
    high: SlidingWindowArr;
    low: SlidingWindowArr;
    close: SlidingWindowArr;
    atr: number;
    dataLen: number;
    previousTr: number[];
    constructor(options: {
        period: number;
    });
    protected getTr(): number;
    add({ high, low, close }: HLC): void;
    get(): number;
}
