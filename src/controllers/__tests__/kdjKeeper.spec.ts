import test from 'ava';
import { last } from 'qs-js-utils';
import { KdjKeeper } from '../kdjKeeper';
const talib = require('talib');
import { sampleCandles, high, low, close } from './sampleCandles';

test('kdj should match talib', t => {
  // const function_desc = talib.explain("STOCH");
  // console.dir((function_desc));
  const fastK = 9;
  const slowK = 3;
  const slowD = 3;
  const res = talib.execute({
    name: 'STOCH',
    close,
    high,
    low,
    startIdx: 0,
    endIdx: close.length - 1,
    optInFastK_Period: fastK,
    optInSlowK_Period: slowK,
    optInSlowD_Period: slowD,
    optInSlowD_MAType: 0,
    optInSlowK_MAType: 0,
  });
  const K = last(res.result.outSlowK);
  const D = last(res.result.outSlowD);
  const J = 3 * K - 2 * D;

  const kdjKeeper = new KdjKeeper({ periodFastK: fastK, periodSlowK: slowK, periodSlowD: slowD });
  for (let candle of sampleCandles) {
    kdjKeeper.add({ high: candle.max, low: candle.min, close: candle.last });
  }

  const ourKdj = kdjKeeper.get();
  t.truthy(Math.abs(ourKdj.K - K) < 0.00001);
  t.truthy(Math.abs(ourKdj.D - D) < 0.00001);
  t.truthy(Math.abs(ourKdj.J - J) < 0.00001);
});
