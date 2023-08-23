import test from 'ava';
import { AtrKeeper } from '../atrKeeper';
const talib = require('talib');

import { sampleCandles } from './sampleCandles';

test('atrKeeper should match talib', t => {
  const period = 3;
  const high = sampleCandles.map(c => c.max);
  const close = sampleCandles.map(c => c.last);
  const low = sampleCandles.map(c => c.min);

  const atrKeeperRes: number[] = [];
  const atrKeeper = new AtrKeeper({ period: period });
  sampleCandles.forEach(c => {
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

  talibRes.result.outReal.forEach((value: any, i: number) => {
    t.truthy(Math.abs(value - atrKeeperRes[i + period]) < 0.00001);
  });
});
