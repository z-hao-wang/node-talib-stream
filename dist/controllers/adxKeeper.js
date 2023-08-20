"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdxKeeper = void 0;
const atrKeeper_1 = require("./atrKeeper");
const assert = require("assert");
// reference: https://sourceforge.net/p/ta-lib/code/HEAD/tree/trunk/ta-lib/c/src/ta_func/ta_ADX.c
class AdxKeeper {
    constructor(options) {
        this.period = 10;
        this.prevMinusDM = 0;
        this.prevPlusDM = 0;
        this.adx = 0;
        this.prevTR = 0;
        this.dataLen = 0;
        this.lastCandle = null;
        this.sumDX = 0;
        this.period = options.period;
        assert(this.period >= 2, 'AdxKeeper period must be >= 2');
    }
    add(candle) {
        this.dataLen++;
        if (this.lastCandle === null) {
            this.lastCandle = candle;
            return;
        }
        const diffP = candle.high - this.lastCandle.high;
        const diffM = this.lastCandle.low - candle.low;
        const addDiff = () => {
            if (diffM > 0 && diffP < diffM) {
                /* Case 2 and 4: +DM=0,-DM=diffM */
                this.prevMinusDM += diffM;
            }
            else if (diffP > 0 && diffP > diffM) {
                /* Case 1 and 3: +DM=diffP,-DM=0 */
                this.prevPlusDM += diffP;
            }
        };
        const calcTr = () => {
            const thisTr = (0, atrKeeper_1.getTr)(candle.high, candle.low, this.lastCandle.close);
            this.prevTR = this.prevTR - this.prevTR / this.period + thisTr;
        };
        if (this.dataLen <= this.period) {
            addDiff();
            this.prevTR += (0, atrKeeper_1.getTr)(candle.high, candle.low, this.lastCandle.close);
        }
        else if (this.dataLen <= this.period * 2) {
            /* Add up all the initial DX. */
            this.prevMinusDM -= this.prevMinusDM / this.period;
            this.prevPlusDM -= this.prevPlusDM / this.period;
            addDiff();
            calcTr();
            if (this.prevTR !== 0) {
                /* Calculate the DX. The value is rounded (see Wilder book). */
                const minusDI = 100.0 * (this.prevMinusDM / this.prevTR);
                const plusDI = 100.0 * (this.prevPlusDM / this.prevTR);
                const sumDi = minusDI + plusDI;
                if (sumDi !== 0) {
                    this.sumDX += 100.0 * (Math.abs(minusDI - plusDI) / sumDi);
                }
            }
            /* Calculate the first ADX */
            if (this.dataLen === this.period * 2) {
                this.adx = this.sumDX / this.period;
            }
        }
        else {
            this.prevMinusDM -= this.prevMinusDM / this.period;
            this.prevPlusDM -= this.prevPlusDM / this.period;
            addDiff();
            calcTr();
            if (this.prevTR !== 0) {
                /* Calculate the DX. The value is rounded (see Wilder book). */
                const minusDI = 100.0 * (this.prevMinusDM / this.prevTR);
                const plusDI = 100.0 * (this.prevPlusDM / this.prevTR);
                const tempSum = minusDI + plusDI;
                if (tempSum !== 0) {
                    const dx = 100.0 * (Math.abs(minusDI - plusDI) / tempSum);
                    /* Calculate the ADX */
                    this.adx = (this.adx * (this.period - 1) + dx) / this.period;
                }
            }
        }
        this.lastCandle = candle;
    }
    get() {
        return this.adx;
    }
}
exports.AdxKeeper = AdxKeeper;
