"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const sliding_window_arr_1 = require("sliding-window-arr");
class SmaKeeper {
    constructor(options) {
        this.currentSma = 0;
        this.period = options.period;
        this.historyValues = new sliding_window_arr_1.SlidingWindowArr({ maxLen: this.period });
    }
    add(val) {
        if (this.historyValues.length() === 0) {
            this.historyValues.push(val);
            this.currentSma = val;
        }
        else {
            if (this.historyValues.length() >= this.period) {
                // we need to reduce the first value and add the last value
                this.currentSma -= this.historyValues.get(0) / this.period;
                this.currentSma += val / this.period;
                this.historyValues.push(val);
            }
            else {
                // the length hasn't reached max, we can just add to new sma
                this.historyValues.push(val);
                this.currentSma = _.sum(this.historyValues.toUnorderedArr()) / this.historyValues.length();
            }
        }
    }
    getValues() {
        return this.historyValues;
    }
    get() {
        if (this.historyValues.length() === 0) {
            throw new Error(`SmaKeeper cannot get sma when there is no value added yet`);
        }
        return this.currentSma;
    }
    length() {
        return this.historyValues.length();
    }
    getPeriod() {
        return this.period;
    }
}
exports.SmaKeeper = SmaKeeper;
