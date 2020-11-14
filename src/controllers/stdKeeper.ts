import { SlidingWindowArr } from 'sliding-window-arr';
import { sum, squareSum } from '../utils/common';

// https://math.stackexchange.com/questions/595541/rolling-standard-deviations
export namespace StdKeeper {
  export interface Options {
    period: number;
  }
}
export class StdKeeper {
  private period: number;
  private std: number = 0;
  private s1 = 0;
  private s2 = 0;
  private count = 0;
  private historyValues: SlidingWindowArr;

  constructor(options: StdKeeper.Options) {
    this.period = options.period;
    this.historyValues = new SlidingWindowArr<number>({ maxLen: this.period });
  }

  static average(values: number[]) {
    return sum(values) / values.length;
  }

  static standardDeviation(values: number[], limit = 1000) {
    if (values.length === 0) return 0;
    let newValues: number[] = [];
    if (values.length > limit) {
      // evenly take limit values as samples
      const step = Math.round(values.length / limit);
      for (let i = 0; i < limit; i++) {
        newValues.push(values[Math.min(step * i, values.length - 1)]);
      }
    } else {
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

  add(val: number) {
    this.count++;
    if (this.historyValues.length() < this.period) {
      this.historyValues.push(val);
      if (this.historyValues.length() === this.period) {
        this.s1 = sum(this.historyValues.toUnorderedArr());
        this.s2 = squareSum(this.historyValues.toUnorderedArr());
        const u = this.s1 / this.count;
        const sigmaSquare = this.s2 / this.count - u * u;
        const sigmaUnbiased = (this.count / (this.count - 1)) * sigmaSquare;
        this.std = Math.sqrt(sigmaUnbiased);
      }
    } else {
      this.s1 += val;
      this.s2 += val * val;
      const u = this.s1 / this.count;
      const sigmaSquare = this.s2 / this.count - u * u;
      const sigmaUnbiased = (this.count / (this.count - 1)) * sigmaSquare;
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
