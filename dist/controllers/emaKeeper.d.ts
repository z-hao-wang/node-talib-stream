export declare function getEma(periods: number, price: number, prevEMA?: number): number;
export declare class EmaKeeper {
    period: number;
    dataLen: number;
    ema: number;
    prevValues: number[];
    constructor(options: {
        period: number;
    });
    add(price: number): void;
    get(): number;
}
