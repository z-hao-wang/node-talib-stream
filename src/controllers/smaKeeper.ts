import { SlidingWindowArr } from 'sliding-window-arr';
import { sum } from '../utils/common';

export namespace SmaKeeper {
  export interface Options {
    period: number;
  }
}
export class SmaKeeper {
  private period: number;
  private historyValues: SlidingWindowArr;
  private currentSma: number = 0;
  constructor(options: SmaKeeper.Options) {
    this.period = options.period;
    this.historyValues = new SlidingWindowArr({ maxLen: this.period });
  }

  add(val: number) {
    if (this.historyValues.length() === 0) {
      this.historyValues.push(val);
      this.currentSma = val;
    } else {
      if (this.historyValues.length() >= this.period) {
        // we need to reduce the first value and add the last value
        this.currentSma -= this.historyValues.get(0) / this.period;
        this.currentSma += val / this.period;
        this.historyValues.push(val);
      } else {
        // the length hasn't reached max, we can just add to new sma
        this.historyValues.push(val);
        this.currentSma = sum(this.historyValues.toUnorderedArr()) / this.historyValues.length();
      }
    }
    return this.currentSma;
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
