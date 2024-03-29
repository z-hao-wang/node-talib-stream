"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmaKeeper = exports.getEma = void 0;
const common_1 = require("../utils/common");
function getEma(periods, price, prevEMA = price) {
    const k = 2 / (periods + 1);
    return price * k + prevEMA * (1 - k);
}
exports.getEma = getEma;
class EmaKeeper {
    constructor(options) {
        this.dataLen = 0;
        this.ema = 0;
        // only used for length not reached period
        this.historyValues = [];
        this.period = options.period;
    }
    add(price) {
        this.dataLen++;
        if (this.dataLen < this.period) {
            this.historyValues.push(price);
        }
        else if (this.dataLen === this.period) {
            this.historyValues.push(price);
            this.ema = (0, common_1.sum)(this.historyValues) / this.historyValues.length;
        }
        else {
            this.ema = getEma(this.period, price, this.ema);
        }
        return this.ema;
    }
    peekNext(price) {
        return getEma(this.period, price, this.ema);
    }
    get() {
        return this.ema;
    }
}
exports.EmaKeeper = EmaKeeper;
