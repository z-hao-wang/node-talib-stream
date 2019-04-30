import { HLC } from '../types/sharedTypes';
export declare class AdxKeeper {
    period: number;
    prevMinusDM: number;
    prevPlusDM: number;
    adx: number;
    prevTR: number;
    dataLen: number;
    lastCandle: null | HLC;
    sumDX: number;
    constructor(options: {
        period: number;
    });
    add(candle: HLC): void;
    get(): number;
}
