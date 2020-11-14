import { SlidingWindowArr } from 'sliding-window-arr';
import { sum, squareSum } from '../utils/common';
import { SmaKeeper } from './smaKeeper';

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
  private squareSum = 0;
  private historyValues: SlidingWindowArr;
  private smaKeeper: SmaKeeper;

  constructor(options: StdKeeper.Options) {
    this.period = options.period;
    this.historyValues = new SlidingWindowArr<number>({ maxLen: this.period });
    this.smaKeeper = new SmaKeeper({ period: this.period });
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
    // u = sma
    // (x^2 - 2 * x * u + u^2) / len
    if (this.historyValues.length() >= this.period) {
      const valueRemoved = this.historyValues.first()!;
      this.historyValues.push(val);
      this.smaKeeper.add(val);
      const sma = this.smaKeeper.get();
      this.squareSum += val * val;
      this.squareSum -= valueRemoved * valueRemoved;
      // const middleValSum = sum(this.historyValues.map(v => v * sma * 2));
      const middleValSum = sma * 2 * sma;
      const stdSquare = this.squareSum / this.period - middleValSum + sma * sma;
      this.std = Math.sqrt(stdSquare);
    } else {
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
