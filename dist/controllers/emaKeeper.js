"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEma(periods, price, prevEMA = price) {
    const k = 2 / (periods + 1);
    return price * k + prevEMA * (1 - k);
}
exports.getEma = getEma;
const _ = require("lodash");
class EmaKeeper {
    constructor(options) {
        this.dataLen = 0;
        this.ema = 0;
        this.prevValues = [];
        this.period = options.period;
    }
    add(price) {
        this.dataLen++;
        if (this.dataLen < this.period) {
            this.prevValues.push(price);
        }
        else if (this.dataLen === this.period) {
            this.prevValues.push(price);
            this.ema = _.sum(this.prevValues) / this.prevValues.length;
        }
        else {
            this.ema = getEma(this.period, price, this.ema);
        }
    }
    get() {
        return this.ema;
    }
}
exports.EmaKeeper = EmaKeeper;
