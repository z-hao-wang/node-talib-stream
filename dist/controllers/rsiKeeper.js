"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsiKeeper = void 0;
const sliding_window_arr_1 = require("sliding-window-arr");
const qs_js_utils_1 = require("qs-js-utils");
// http://cns.bu.edu/~gsc/CN710/fincast/Technical%20_indicators/Relative%20Strength%20Index%20(RSI).htm
class RsiKeeper {
    constructor(options) {
        this.period = 10;
        this.lastPrice = 0;
        this.rsi = 0;
        this.dataLen = 0;
        this.prevAvgGain = 0;
        this.prevAvgLoss = 0;
        this.period = options.period;
        this.prevGain = new sliding_window_arr_1.SlidingWindowArr({ maxLen: options.period });
        this.prevLoss = new sliding_window_arr_1.SlidingWindowArr({ maxLen: options.period });
    }
    add(price) {
        this.dataLen++;
        if (this.dataLen === 1) {
            this.lastPrice = price;
            return;
        }
        const gain = Math.max(0, price - this.lastPrice);
        const loss = Math.max(0, this.lastPrice - price);
        const periodMinus = this.period - 1;
        if (this.dataLen < this.period + 1) {
            this.prevGain.push(gain);
            this.prevLoss.push(loss);
        }
        else if (this.dataLen === this.period + 1) {
            // first rs
            this.prevGain.push(gain);
            this.prevLoss.push(loss);
            // save this to be used later
            this.prevAvgGain = (0, qs_js_utils_1.sum)(this.prevGain.toUnorderedArr()) / this.prevGain.length();
            this.prevAvgLoss = (0, qs_js_utils_1.sum)(this.prevLoss.toUnorderedArr()) / this.prevLoss.length();
            /* Often documentation present the RSI calculation as follow:
             *    RSI = 100 - (100 / 1 + (prevGain/prevLoss))
             *
             * The following is equivalent:
             *    RSI = 100 * (prevGain/(prevGain+prevLoss))
             *
             * The second equation is used here for speed optimization.
             */
            this.rsi = (100 * this.prevAvgGain) / (this.prevAvgGain + this.prevAvgLoss);
        }
        else {
            // we need to use previous avg to generate rsi
            this.prevAvgGain = (this.prevAvgGain * periodMinus + gain) / this.period;
            this.prevAvgLoss = (this.prevAvgLoss * periodMinus + loss) / this.period;
            const smoothedRS = this.prevAvgGain / this.prevAvgLoss;
            this.rsi = 100 - 100 / (1 + smoothedRS);
        }
        this.lastPrice = price;
    }
    get() {
        return this.rsi;
    }
}
exports.RsiKeeper = RsiKeeper;
