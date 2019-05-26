import { EmaKeeper } from './emaKeeper';
export declare class MacdKeeper {
    fastPeriod: number;
    slowPeriod: number;
    signalPeriod: number;
    dataLen: number;
    macd: number;
    fastEmaKeeper: EmaKeeper;
    slowEmaKeeper: EmaKeeper;
    signalEmaKeeper: EmaKeeper;
    constructor(options: {
        fastPeriod: number;
        slowPeriod: number;
        signalPeriod: number;
    });
    add(price: number): void;
    get(): {
        macd: number;
        macdSignal: number;
        histogram: number;
    };
}
