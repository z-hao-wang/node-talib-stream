import test from 'ava';
import { RsiKeeper } from '../rsiKeeper';
const talib = require('talib');
import { sampleCandles } from './sampleCandles';

test('rsiKeeper should match talib', (t) => {
    const period = 3;
    const rsiKeeperRes: number[] = [];
    const rsiKeeper = new RsiKeeper({ period: period });
    sampleCandles.forEach(c => {
      rsiKeeper.add(c.last);
      rsiKeeperRes.push(rsiKeeper.get());
    });

    // compare talib result
    const closePrices = sampleCandles.map(c => c.last);
    const talibRes = talib.execute({
      name: 'RSI',
      startIdx: 0,
      endIdx: closePrices.length - 1,
      inReal: closePrices,
      optInTimePeriod: period,
    });

   talibRes.result.outReal.forEach((value: any, i: number) => {
      t.truthy(Math.abs(value - rsiKeeperRes[i + period]) < 0.00001);
    });
});
