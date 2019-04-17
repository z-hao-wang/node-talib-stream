import { SlidingWindowArr } from './slidingWindowArr';
import * as _ from 'lodash';
// http://cns.bu.edu/~gsc/CN710/fincast/Technical%20_indicators/Relative%20Strength%20Index%20(RSI).htm

export class RsiKeeper {
  period: number = 10;
  prevGain: SlidingWindowArr;
  prevLoss: SlidingWindowArr;
  lastPrice: number = 0;
  rsi: number = 0;
  dataLen = 0;
  prevAvgGain: number = 0;
  prevAvgLoss: number = 0;

  constructor(options: { periods: number }) {
    this.period = options.periods;
    this.prevGain = new SlidingWindowArr({ maxLen: options.periods });
    this.prevLoss = new SlidingWindowArr({ maxLen: options.periods });
  }

  add(price: number) {
    this.dataLen++;
    if (this.dataLen === 1) {
      this.lastPrice = price;
      return;
    }

    const gain = Math.max(0, price - this.lastPrice);
    const loss = Math.max(0, this.lastPrice - price);
    const periodMinus = this.period - 1;
    if (this.dataLen < this.period + 1) {
      this.prevGain.push(gain);
      this.prevLoss.push(loss);
    } else if (this.dataLen === this.period + 1) {
      // first rs
      this.prevGain.push(gain);
      this.prevLoss.push(loss);
      // save this to be used later
      this.prevAvgGain = _.sum(this.prevGain.toUnorderedArr()) / this.prevGain.length();
      this.prevAvgLoss = _.sum(this.prevLoss.toUnorderedArr()) / this.prevLoss.length();
      /* Often documentation present the RSI calculation as follow:
       *    RSI = 100 - (100 / 1 + (prevGain/prevLoss))
       *
       * The following is equivalent:
       *    RSI = 100 * (prevGain/(prevGain+prevLoss))
       *
       * The second equation is used here for speed optimization.
       */
      this.rsi = (100 * this.prevAvgGain) / (this.prevAvgGain + this.prevAvgLoss);
    } else {
      // we need to use previous avg to generate rsi
      this.prevAvgGain = (this.prevAvgGain * periodMinus + gain) / this.period;
      this.prevAvgLoss = (this.prevAvgLoss * periodMinus + loss) / this.period;

      const smoothedRS = this.prevAvgGain / this.prevAvgLoss;
      this.rsi = 100 - 100 / (1 + smoothedRS);
    }

    this.lastPrice = price;
  }

  get() {
    return this.rsi;
  }
}
