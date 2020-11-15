export declare namespace CandleKeeper {
    interface Options {
        period: number;
        shiftMs?: number;
        onNewCandle?: (candle: CandleKeeper.Candle) => any;
    }
    interface Candle {
        ts: number;
        max: number;
        min: number;
        first: number;
        last: number;
    }
}
export declare class CandleKeeper {
    private period;
    private max;
    private min;
    private last;
    private first;
    private shiftMs;
    private lastCandle?;
    private onNewCandle?;
    constructor(options: CandleKeeper.Options);
    static snapTimestamp(ts: number, resolution: number, shiftMs?: number): number;
    add(ts: number, price: number): void;
    get(): CandleKeeper.Candle | undefined;
    getPeriod(): number;
}
