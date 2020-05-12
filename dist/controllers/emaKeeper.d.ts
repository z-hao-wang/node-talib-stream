export declare function getEma(periods: number, price: number, prevEMA?: number): number;
export declare class EmaKeeper {
    protected period: number;
    protected dataLen: number;
    protected ema: number;
    protected historyValues: number[];
    constructor(options: {
        period: number;
    });
    add(price: number): number;
    peekNext(price: number): number;
    get(): number;
}
