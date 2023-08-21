import { AtrKeeper } from '../atrKeeper';
import * as _ from 'lodash';
const talib = require('talib');

import { sampleCandles } from './sampleCandles';

describe('atrKeeper', () => {
  it('should match talib', () => {
    const period = 3;
    const high = sampleCandles.map( c => c.max);
    const close = sampleCandles.map( c => c.last);
    const low = sampleCandles.map(c => c.min);

    const atrKeeperRes: number[] = [];
    const atrKeeper = new AtrKeeper({ period: period });
    _.each(sampleCandles, c => {
      atrKeeper.add({
        close: c.last,
        high: c.max,
        low: c.min,
      });
      atrKeeperRes.push(atrKeeper.get());
    });

    // compare talib result
    const talibRes = talib.execute({
      name: 'ATR',
      startIdx: 0,
      endIdx: close.length - 1,
      close,
      high,
      low,
      optInTimePeriod: period,
    });

    _.each(talibRes.result.outReal, (t, i: number) => {
      expect(Math.abs(t - atrKeeperRes[i + period]) < 0.00001).toBeTruthy();
    });
  });
});
