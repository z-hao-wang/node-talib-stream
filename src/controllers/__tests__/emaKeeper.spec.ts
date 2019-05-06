import { EmaKeeper } from '../emaKeeper';
import * as _ from 'lodash';
const talib = require('talib');

import { sampleCandles } from './sampleCandles';
export const MATypes = {
  SMA: 0,
  EMA: 1,
  WMA: 2,
  DEMA: 3,
  TEMA: 4,
  TRIMA: 5,
  KAMA: 6,
  MAMA: 7,
  T3: 8,
};

describe('emaKeeper', () => {
  it('should match talib', () => {
    const period = 3;
    const close = _.map(sampleCandles, c => c.last);

    const emaKeeperRes: any = [];
    const emaKeeper = new EmaKeeper({ period: period });
    _.each(sampleCandles, c => {
      emaKeeper.add(c.last);
      emaKeeperRes.push(emaKeeper.get());
    });

    // compare talib result
    const talibRes = talib.execute({
      name: 'MA',
      optInMAType: MATypes.EMA,
      startIdx: 0,
      endIdx: close.length - 1,
      inReal: close,
      optInTimePeriod: period,
    });

    _.each(talibRes.result.outReal, (t, i: number) => {
      expect(Math.abs(t - emaKeeperRes[i + period - 1]) < 0.00001).toBeTruthy();
    });
  });
});
