export function getEma(periods: number, price: number, prevEMA = price) {
  const k = 2 / (periods + 1);
  return price * k + prevEMA * (1 - k);
}

import * as _ from 'lodash';

export class EmaKeeper {
  protected period: number;
  protected dataLen = 0;
  protected ema: number = 0;
  // only used for length not reached period
  protected historyValues: number[] = [];

  constructor(options: { period: number }) {
    this.period = options.period;
  }

  add(price: number) {
    this.dataLen++;
    if (this.dataLen < this.period) {
      this.historyValues.push(price);
    } else if (this.dataLen === this.period) {
      this.historyValues.push(price);
      this.ema = _.sum(this.historyValues) / this.historyValues.length;
    } else {
      this.ema = getEma(this.period, price, this.ema);
    }
    return this.ema;
  }

  peekNext(price: number) {
    return getEma(this.period, price, this.ema);
  }

  get() {
    return this.ema;
  }
}
