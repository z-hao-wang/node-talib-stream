export function getEma(periods: number, price: number, prevEMA = price) {
  const k = 2 / (periods + 1);
  return price * k + prevEMA * (1 - k);
}

import * as _ from 'lodash';

export class EmaKeeper {
  period: number;
  dataLen = 0;
  ema: number = 0;
  prevValues: number[] = [];

  constructor(options: { period: number }) {
    this.period = options.period;
  }

  add(price: number) {
    this.dataLen++;
    if (this.dataLen < this.period) {
      this.prevValues.push(price);
    } else if (this.dataLen === this.period) {
      this.prevValues.push(price);
      this.ema = _.sum(this.prevValues) / this.prevValues.length;
    } else {
      this.ema = getEma(this.period, price, this.ema);
    }
  }

  get() {
    return this.ema;
  }
}
