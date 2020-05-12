"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sliding_window_arr_1 = require("sliding-window-arr");
const common_1 = require("../utils/common");
const assert = require("assert");
function getTr(high, low, prevClose) {
    return Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
}
exports.getTr = getTr;
class AtrKeeper {
    constructor(options) {
        this.period = 10;
        this.atr = 0;
        this.dataLen = 0;
        this.previousTr = [];
        this.period = options.period;
        this.high = new sliding_window_arr_1.SlidingWindowArr({ maxLen: options.period });
        this.low = new sliding_window_arr_1.SlidingWindowArr({ maxLen: options.period });
        this.close = new sliding_window_arr_1.SlidingWindowArr({ maxLen: options.period });
        assert(this.period >= 2, 'AtrKeeper period must be >= 2');
    }
    /* True Range is the greatest of the following:
     *
     *  val1 = distance from today's high to today's low.
     *  val2 = distance from yesterday's close to today's high.
     *  val3 = distance from yesterday's close to today's low.
     *
     * Some books and software makes the first TR value to be
     * the (high - low) of the first bar. This function instead
     * ignore the first price bar, and only output starting at the
     * second price bar are valid. This is done for avoiding
     * inconsistency.
     */
    getTr() {
        return getTr(this.high.last(), this.low.last(), this.close.get(-2));
    }
    add({ high, low, close }) {
        this.dataLen++;
        this.high.push(high);
        this.low.push(low);
        this.close.push(close);
        if (this.dataLen < this.period + 1) {
            if (this.dataLen > 1) {
                this.previousTr.push(this.getTr());
            }
        }
        else if (this.dataLen === this.period + 1) {
            // get 1st atr by simple moving average
            this.atr = common_1.sum(this.previousTr) / this.previousTr.length;
            this.atr = (this.atr * (this.period - 1) + this.getTr()) / this.period;
        }
        else {
            /* Subsequent value are smoothed using the
             * previous ATR value (Wilder's approach).
             *  1) Multiply the previous ATR by 'period-1'.
             *  2) Add today TR value.
             *  3) Divide by 'period'.
             */
            this.atr = (this.atr * (this.period - 1) + this.getTr()) / this.period;
        }
    }
    peekNext({ high, low }) {
        return (this.atr * (this.period - 1) + getTr(high, low, this.close.last())) / this.period;
    }
    get() {
        return this.atr;
    }
}
exports.AtrKeeper = AtrKeeper;
