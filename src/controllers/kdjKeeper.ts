import { MaxMinKeeper } from './maxMinKeeper';
import { HLC } from '../types/sharedTypes';
import { SmaKeeper } from './smaKeeper';

export namespace KdjKeeper {
  export interface Options {
    periodFastK: number;
    periodSlowK: number;
    periodSlowD: number;
  }
}
/* With stochastic, there is a total of 4 different lines that
 * are defined: FASTK, FASTD, SLOWK and SLOWD.
 *
 * The D is the signal line usually drawn over its
 * corresponding K function.
 *
 *                    (Today's Close - LowestLow)
 *  FASTK(Kperiod) =  --------------------------- * 100
 *                     (HighestHigh - LowestLow)
 *
 *
 *  SLOWK(SlowKperiod, MA type) = MA Smoothed FASTK over SlowKperiod
 *
 *  SLOWD(SlowDperiod, MA Type) = MA Smoothed SLOWK over SlowDperiod
 *
 * The HighestHigh and LowestLow are the extreme values among the
 * last 'Kperiod'.
 *
 * SLOWK and FASTD are equivalent when using the same period.
 *
 * The following shows how these four lines are made available in TA-LIB:
 *
 *  TA_STOCH  : Returns the SLOWK and SLOWD
 *
 * The TA_STOCH function correspond to the more widely implemented version
 * found in many software/charting package. The TA_STOCHF is more rarely
 * used because its higher volatility cause often whipsaws.
 */

export class KdjKeeper {
  periodFastK: number;
  periodSlowK: number;
  periodSlowD: number;
  maxMinKeeper: MaxMinKeeper;
  slowK: SmaKeeper;
  slowD: SmaKeeper;
  kdj: { K: number; D: number; J: number } = { K: 0, D: 0, J: 0 };
  constructor(options: KdjKeeper.Options) {
    this.periodFastK = options.periodFastK;
    this.periodSlowK = options.periodSlowK;
    this.periodSlowD = options.periodSlowD;
    this.slowK = new SmaKeeper({ period: this.periodSlowK });
    this.slowD = new SmaKeeper({ period: this.periodSlowD });
    this.maxMinKeeper = new MaxMinKeeper({ period: this.periodFastK * 2 });
  }

  add({ high, low, close }: HLC) {
    this.maxMinKeeper.add(high);
    this.maxMinKeeper.add(low);

    const KFast = this.peekNext(close);
    this.slowK.add(KFast);
    this.slowD.add(this.slowK.get());
    const K = this.slowK.get();
    const D = this.slowD.get();
    this.kdj = {
      K,
      D,
      J: 3 * K - 2 * D,
    };
  }

  peekNext(close: number) {
    const rollingHigh = this.maxMinKeeper.getMax();
    const rollingLow = this.maxMinKeeper.getMin();
    const K = (100 * (close - rollingLow)) / (rollingHigh - rollingLow);
    return K;
  }

  get() {
    return this.kdj;
  }

  length() {
    return this.maxMinKeeper.getLen();
  }
}
