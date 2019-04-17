import { SlidingWindowArr } from './slidingWindowArr';
import * as _ from 'lodash';
import * as assert from 'assert';

export class AtrKeeper {
  period: number = 10;
  high: SlidingWindowArr;
  low: SlidingWindowArr;
  close: SlidingWindowArr;
  atr: number = 0;
  dataLen: number = 0;
  previousTr: number[] = [];

  constructor(options: { periods: number }) {
    this.period = options.periods;
    this.high = new SlidingWindowArr({ maxLen: options.periods });
    this.low = new SlidingWindowArr({ maxLen: options.periods });
    this.close = new SlidingWindowArr({ maxLen: options.periods });
    assert(this.period >= 2, 'AtrKeeper period must be >= 2');
  }

  /* True Range is the greatest of the following:
   *
   *  val1 = distance from today's high to today's low.
   *  val2 = distance from yesterday's close to today's high.
   *  val3 = distance from yesterday's close to today's low.
   *
   * Some books and software makes the first TR value to be
   * the (high - low) of the first bar. This function instead
   * ignore the first price bar, and only output starting at the
   * second price bar are valid. This is done for avoiding
   * inconsistency.
   */
  protected getTr() {
    return Math.max(
      this.high.last()! - this.low.last()!,
      Math.abs(this.high.last()! - this.close.get(-2)!),
      Math.abs(this.low.last()! - this.close.get(-2)!),
    );
  }

  add({ high, low, close }: { high: number; low: number; close: number }) {
    this.dataLen++;
    this.high.push(high);
    this.low.push(low);
    this.close.push(close);
    if (this.dataLen < this.period + 1) {
      if (this.dataLen > 1) {
        this.previousTr.push(this.getTr());
      }
    } else if (this.dataLen === this.period + 1) {
      // get 1st atr by simple moving average
      this.atr = _.sum(this.previousTr) / this.previousTr.length;
      this.atr = (this.atr * (this.period - 1) + this.getTr()) / this.period;
    } else {
      /* Subsequent value are smoothed using the
       * previous ATR value (Wilder's approach).
       *  1) Multiply the previous ATR by 'period-1'.
       *  2) Add today TR value.
       *  3) Divide by 'period'.
       */
      this.atr = (this.atr * (this.period - 1) + this.getTr()) / this.period;
    }
  }

  get() {
    return this.atr;
  }
}
