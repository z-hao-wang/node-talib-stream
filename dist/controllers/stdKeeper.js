"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sliding_window_arr_1 = require("sliding-window-arr");
const common_1 = require("../utils/common");
const smaKeeper_1 = require("./smaKeeper");
class StdKeeper {
    constructor(options) {
        this.std = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.squareSum = 0;
        this.period = options.period;
        this.historyValues = new sliding_window_arr_1.SlidingWindowArr({ maxLen: this.period });
        this.smaKeeper = new smaKeeper_1.SmaKeeper({ period: this.period });
    }
    static average(values) {
        return common_1.sum(values) / values.length;
    }
    static standardDeviation(values, limit = 1000) {
        if (values.length === 0)
            return 0;
        let newValues = [];
        if (values.length > limit) {
            // evenly take limit values as samples
            const step = Math.round(values.length / limit);
            for (let i = 0; i < limit; i++) {
                newValues.push(values[Math.min(step * i, values.length - 1)]);
            }
        }
        else {
            newValues = values;
        }
        const avg = StdKeeper.average(newValues);
        const squareDiffs = newValues.map(value => {
            const diff = value - avg;
            const sqrDiff = diff * diff;
            return sqrDiff;
        });
        const avgSquareDiff = StdKeeper.average(squareDiffs);
        return Math.sqrt(avgSquareDiff);
    }
    add(val) {
        // u = sma
        // (x^2 - 2 * x * u + u^2) / len
        if (this.historyValues.length() >= this.period) {
            const valueRemoved = this.historyValues.first();
            this.historyValues.push(val);
            this.smaKeeper.add(val);
            const sma = this.smaKeeper.get();
            this.squareSum += val * val;
            this.squareSum -= valueRemoved * valueRemoved;
            // const middleValSum = sum(this.historyValues.map(v => v * sma * 2));
            const middleValSum = sma * 2 * sma;
            const stdSquare = this.squareSum / this.period - middleValSum + sma * sma;
            this.std = Math.sqrt(stdSquare);
        }
        else {
            this.historyValues.push(val);
            this.smaKeeper.add(val);
            this.squareSum += val * val;
            this.std = StdKeeper.standardDeviation(this.historyValues.toUnorderedArr());
        }
    }
    get() {
        return this.std;
    }
    length() {
        return this.historyValues.length();
    }
    getPeriod() {
        return this.period;
    }
}
exports.StdKeeper = StdKeeper;
