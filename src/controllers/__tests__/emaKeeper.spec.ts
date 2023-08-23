import { EmaKeeper } from '../emaKeeper';
import test from 'ava';

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
test('emaKeeper should match talib',(t) => {
    const period = 3;
    const close = sampleCandles.map( (c) => c.last);

    const emaKeeperRes: number[] = [];
    const emaKeeper = new EmaKeeper({ period: period });
    close.forEach((c) => {
      emaKeeper.add(c);
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

    talibRes.result.outReal.forEach( (value:any, i: number) => {
      t.truthy(Math.abs(value - emaKeeperRes[i + period - 1]) < 0.00001);
    });
});
