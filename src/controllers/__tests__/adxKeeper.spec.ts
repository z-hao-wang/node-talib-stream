import test from 'ava';
import { AdxKeeper } from '../adxKeeper';

const talib = require('talib');

import { sampleCandles } from './sampleCandles';


test('adxKeeper should match talib', t => {
    const period = 3;
    const high = sampleCandles.map(c => c.max);
    const close = sampleCandles.map(c => c.last);
    const low = sampleCandles.map(c => c.min);

    const adxKeeperRes: number[] = [];
    const adxKeeper = new AdxKeeper({ period: period });
    sampleCandles.forEach(c => {
      adxKeeper.add({
        close: c.last,
        high: c.max,
        low: c.min,
      });
      adxKeeperRes.push(adxKeeper.get());
    });

    // compare talib result
    const talibRes = talib.execute({
      name: 'ADX',
      startIdx: 0,
      endIdx: close.length - 1,
      close,
      high,
      low,
      optInTimePeriod: period,
    });
    talibRes.result.outReal.forEach( (t:any, i: number) => {
      t.truthy(Math.abs(t - adxKeeperRes[i + period * 2 - 1]) < 0.00001);
    });
});
