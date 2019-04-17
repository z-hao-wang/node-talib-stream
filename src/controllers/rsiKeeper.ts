import { SlidingWindowArr } from './slidingWindowArr';
import * as _ from 'lodash';
// http://cns.bu.edu/~gsc/CN710/fincast/Technical%20_indicators/Relative%20Strength%20Index%20(RSI).htm

export class RsiKeeper {
  periods: number = 10;
  prevGain: SlidingWindowArr;
  prevLoss: SlidingWindowArr;
  lastPrice: number = 0;
  rsi: number = 0;
  dataLen = 0;
  prevAvgGain: number = 0;
  prevAvgLoss: number = 0;

  constructor(options: {periods: number}) {
    this.periods = options.periods;
    this.prevGain = new SlidingWindowArr({maxLen: options.periods});
    this.prevLoss = new SlidingWindowArr({maxLen: options.periods})
  }

  add(price: number) {
    this.dataLen++;
    if (this.dataLen === 1) {
      this.lastPrice = price;
      return;
    }

    const gain = Math.max(0, price - this.lastPrice);
    const loss = Math.max(0, this.lastPrice - price);
    const periodMinus = this.periods - 1;
    if (this.dataLen === this.periods) {
      // first rs
      this.prevGain.push(gain);
      this.prevLoss.push(loss);
      this.prevAvgGain = _.sum(this.prevGain.toUnorderedArr());
      this.prevAvgLoss = _.sum(this.prevLoss.toUnorderedArr());
      const firstRs = this.prevAvgGain / this.prevAvgLoss;
      this.rsi = 100 - (100 / (1 + firstRs));
    } else if (this.dataLen > this.periods) {
      // we need to use previous avg to generate rsi
      this.prevAvgGain = (this.prevAvgGain * periodMinus + gain) / this.periods;
      this.prevAvgLoss = (this.prevAvgLoss * periodMinus + loss) / this.periods;

      const smoothedRS = this.prevAvgGain / this.prevAvgLoss;
      this.rsi = 100 - (100 / (1 + smoothedRS));
    } else {
      this.prevGain.push(gain);
      this.prevLoss.push(loss);
    }
    this.lastPrice = price;
  }

  getRsi() {
    return this.rsi;
  }
}
