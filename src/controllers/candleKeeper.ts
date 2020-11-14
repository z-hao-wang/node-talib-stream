export namespace CandleKeeper {
  export interface Options {
    period: number;
  }
}
export class CandleKeeper {
  private period: number;
  private max = 0;
  private min = 0;
  private last = 0;
  private first = 0;
  private lastCandle?: { ts: number; max: number; min: number; first: number; last: number };

  constructor(options: CandleKeeper.Options) {
    this.period = options.period;
  }

  // snap timestamp to resolution.
  // e.g. 10:01:00 should snap tp 10:00:00 for 14400 resolution
  // special if it is already the exact time, it will return the same time back.
  // be aware not to create infinite loops
  static snapTimestamp(ts: number, resolution: number): number {
    if (!resolution) throw new Error('invalid resolution in snapTimestamp');
    let newEpoch = ts - (ts % (resolution * 1000));
    return newEpoch;
  }

  add(ts: number, price: number) {
    if (!this.lastCandle) {
      this.lastCandle = {
        ts: CandleKeeper.snapTimestamp(ts, this.period),
        max: price,
        min: price,
        first: price,
        last: price,
      };
    } else if (ts - this.lastCandle.ts >= this.period * 1000) {
      // generate new candle
      this.lastCandle = {
        ts: CandleKeeper.snapTimestamp(ts, this.period),
        max: this.max,
        min: this.min,
        first: this.first,
        last: this.last,
      };
      this.first = 0;
    }

    if (!this.first) {
      this.first = price;
      this.max = price;
      this.min = price;
    }
    this.max = Math.max(price, this.max);
    this.min = Math.min(price, this.min);
    this.last = price;
  }

  get() {
    return this.lastCandle;
  }

  getPeriod() {
    return this.period;
  }
}
