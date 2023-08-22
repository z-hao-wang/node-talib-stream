import { MacdKeeper } from '../macdKeeper';
import test from 'ava';
const talib = require('talib');

import { sampleCandles } from './sampleCandles';

test('macdKeeper should match talib', (t) => {
    const fastPeriod = 12;
    const slowPeriod = 26;
    const signalPeriod = 9;
    const close = sampleCandles.map( (c) => c.last);

    const macdKeeperRes: number[] = [];
    const macdSignalKeeperRes: number[] = [];
    const macdHistKeeperRes: number[] = [];
    const macdKeeper = new MacdKeeper({ fastPeriod, slowPeriod, signalPeriod });
    close.forEach( (c) => {
      macdKeeper.add(c);
      const keeperRes = macdKeeper.get();
      macdKeeperRes.push(keeperRes.macd);
      macdSignalKeeperRes.push(keeperRes.macdSignal);
      macdHistKeeperRes.push(keeperRes.histogram);
    });

    // compare talib result
    const talibRes = talib.execute({
      name: 'MACD',
      startIdx: 0,
      endIdx: close.length - 1,
      inReal: close,
      optInFastPeriod: fastPeriod,
      optInSlowPeriod: slowPeriod,
      optInSignalPeriod: signalPeriod,
    });

    const lookBackPeriod = signalPeriod + slowPeriod - 2;
    talibRes.result.outMACD.forEach( (element:number, i: number) => {
      t.truthy(Math.abs(element - macdKeeperRes[i + lookBackPeriod]) < 0.00001);
    });

    talibRes.result.outMACDSignal.forEach( (element:number, i: number) => {
      t.truthy(Math.abs(element - macdSignalKeeperRes[i + lookBackPeriod]) < 0.00001);
    });

    talibRes.result.outMACDHist.forEach( (element:number, i: number) => {
      t.truthy(Math.abs(element - macdHistKeeperRes[i + lookBackPeriod]) < 0.00001);
    });
  });