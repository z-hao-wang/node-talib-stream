"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sliding_window_arr_1 = require("sliding-window-arr");
const common_1 = require("../utils/common");
class StdKeeper {
    constructor(options) {
        this.std = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.count = 0;
        this.period = options.period;
        this.historyValues = new sliding_window_arr_1.SlidingWindowArr({ maxLen: this.period });
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
        this.count++;
        if (this.historyValues.length() < this.period) {
            this.historyValues.push(val);
            if (this.historyValues.length() === this.period) {
                this.s1 = common_1.sum(this.historyValues.toUnorderedArr());
                this.s2 = common_1.squareSum(this.historyValues.toUnorderedArr());
                const u = this.s1 / this.count;
                const sigmaSquare = this.s2 / this.count - (u * u);
                const sigmaUnbiased = this.count / (this.count - 1) * sigmaSquare;
                this.std = Math.sqrt(sigmaUnbiased);
            }
        }
        else {
            this.s1 += val;
            this.s2 += val * val;
            const u = this.s1 / this.count;
            const sigmaSquare = this.s2 / this.count - (u * u);
            const sigmaUnbiased = this.count / (this.count - 1) * sigmaSquare;
            this.std = Math.sqrt(sigmaUnbiased);
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
