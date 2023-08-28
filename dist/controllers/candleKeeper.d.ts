export declare namespace CandleKeeper {
    interface Options {
        period: number;
        shiftMs?: number;
        includesVolume?: boolean;
        onNewCandle?: (candle: CandleKeeper.Candle) => any;
        exchange?: string;
        symbol?: string;
    }
    interface Candle {
        ts: number;
        max: number;
        min: number;
        first: number;
        last: number;
        buy_volume?: number;
        sell_volume?: number;
        buy_cost?: number;
        sell_cost?: number;
        exchange?: string;
        pairDb?: string;
        avg?: number;
        buy_times?: number;
        sell_times?: number;
        len?: number;
    }
}
export declare class CandleKeeper {
    private period;
    private max;
    private min;
    private last;
    private first;
    private buy_volume;
    private sell_volume;
    private buy_cost;
    private sell_cost;
    private buy_times;
    private sell_times;
    private shiftMs;
    private len;
    private lastCandle?;
    private onNewCandleCallbacks;
    private includesVolume;
    exchange?: string;
    symbol?: string;
    constructor(options: CandleKeeper.Options);
    setOnNewCandle(onNewCandle: (candle: CandleKeeper.Candle) => any): void;
    static snapTimestamp(ts: number, resolution: number, shiftMs?: number): number;
    addTrade(tradeV2: number[]): void;
    resetCandle(): void;
    add(ts: number, price: number, side?: number, amount?: number): void;
    get(): CandleKeeper.Candle;
    getTempCandle(ts: number): CandleKeeper.Candle;
    protected runNewCandles(): void;
    getPeriod(): number;
}
