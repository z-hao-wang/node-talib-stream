import * as _ from 'lodash';
import { EmaKeeper } from './emaKeeper';

export class MacdKeeper {
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
  dataLen = 0;
  macd: number = 0;

  fastEmaKeeper: EmaKeeper;
  slowEmaKeeper: EmaKeeper;
  signalEmaKeeper: EmaKeeper;

  constructor(options: { fastPeriod: number; slowPeriod: number; signalPeriod: number }) {
    this.fastPeriod = options.fastPeriod;
    this.slowPeriod = options.slowPeriod;
    this.signalPeriod = options.signalPeriod;
    // validation
    if (this.slowPeriod < this.fastPeriod) {
      throw new Error(`slowPeriod ${this.slowPeriod} cannot be smaller than fastPeriod ${this.fastPeriod}`);
    }
    if (this.fastPeriod < this.signalPeriod) {
      throw new Error(`fastPeriod ${this.fastPeriod} cannot be smaller than signalPeriod ${this.signalPeriod}`);
    }

    this.signalPeriod = options.signalPeriod;
    this.fastEmaKeeper = new EmaKeeper({ period: this.fastPeriod });
    this.slowEmaKeeper = new EmaKeeper({ period: this.slowPeriod });
    this.signalEmaKeeper = new EmaKeeper({ period: this.signalPeriod });
  }

  add(price: number) {
    this.dataLen++;
    this.slowEmaKeeper.add(price);
    // only start adding fast EMA at a later time. to match ta-lib behavior
    if (this.dataLen > this.slowPeriod - this.fastPeriod) {
      this.fastEmaKeeper.add(price);
    }

    if (this.dataLen >= this.slowPeriod) {
      this.macd = this.fastEmaKeeper.get() - this.slowEmaKeeper.get();
      this.signalEmaKeeper.add(this.macd);
    }
  }

  get(): { macd: number; macdSignal: number; histogram: number } {
    // only return macd when it's actually usable, to match ta-lib result
    const macd = this.dataLen >= this.slowPeriod + this.signalPeriod - 1 ? this.macd : 0;
    return { macd, macdSignal: this.signalEmaKeeper.get(), histogram: macd - this.signalEmaKeeper.get() };
  }
}
