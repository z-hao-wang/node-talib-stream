import { MaxMinKeeper } from './maxMinKeeper';
import { HLC } from '../types/sharedTypes';
import { SmaKeeper } from "./smaKeeper";
export declare namespace KdjKeeper {
    interface Options {
        periodFastK: number;
        periodSlowK: number;
        periodSlowD: number;
    }
}
export declare class KdjKeeper {
    periodFastK: number;
    periodSlowK: number;
    periodSlowD: number;
    maxMinKeeper: MaxMinKeeper;
    slowK: SmaKeeper;
    slowD: SmaKeeper;
    kdj: {
        K: number;
        D: number;
        J: number;
    };
    constructor(options: KdjKeeper.Options);
    add({ high, low, close }: HLC): void;
    peekNext(close: number): number;
    get(): {
        K: number;
        D: number;
        J: number;
    };
    length(): number;
}
