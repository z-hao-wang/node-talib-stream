"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CandleKeeper {
    constructor(options) {
        this.max = 0;
        this.min = 0;
        this.last = 0;
        this.first = 0;
        this.shiftMs = 0;
        this.period = options.period;
        if (options.shiftMs && options.shiftMs > 0) {
            throw new Error(`shiftMs must be < 0`);
        }
        this.shiftMs = options.shiftMs || 0;
        this.onNewCandle = options.onNewCandle;
    }
    // snap timestamp to resolution.
    // e.g. 10:01:00 should snap tp 10:00:00 for 14400 resolution
    // special if it is already the exact time, it will return the same time back.
    // be aware not to create infinite loops
    static snapTimestamp(ts, resolution, shiftMs = 0) {
        if (!resolution)
            throw new Error('invalid resolution in snapTimestamp');
        let newEpoch = ts - (ts % (resolution * 1000)) + shiftMs;
        if (shiftMs) {
            if (ts - newEpoch > resolution * 1000) {
                newEpoch += resolution * 1000;
            }
        }
        return newEpoch;
    }
    add(ts, price) {
        const shiftMs = this.shiftMs;
        if (!this.lastCandle) {
            this.lastCandle = {
                ts: CandleKeeper.snapTimestamp(ts, this.period, shiftMs),
                max: price,
                min: price,
                first: price,
                last: price,
            };
        }
        else if (ts - this.lastCandle.ts >= this.period * 1000) {
            // generate new candle
            this.lastCandle = {
                ts: CandleKeeper.snapTimestamp(ts, this.period, shiftMs),
                max: this.max,
                min: this.min,
                first: this.first,
                last: this.last,
            };
            this.onNewCandle && this.onNewCandle(this.lastCandle);
            this.first = 0;
        }
        if (!this.first) {
            this.first = price;
            this.max = price;
            this.min = price;
        }
        this.max = Math.max(price, this.max);
        this.min = Math.min(price, this.min);
        this.last = price;
    }
    get() {
        return this.lastCandle;
    }
    getPeriod() {
        return this.period;
    }
}
exports.CandleKeeper = CandleKeeper;
