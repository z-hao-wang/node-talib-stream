// import { MacdKeeper } from '../macdKeeper';
// import * as _ from 'lodash';
// const talib = require('talib');
//
// import { sampleCandles } from './sampleCandles';
//
// describe('macdKeeper', () => {
//   it('should match talib', () => {
//     const fastPeriod = 12;
//     const slowPeriod = 26;
//     const signalPeriod = 9;
//     const close = _.map(sampleCandles, c => c.last);
//
//     const macdKeeperRes: number[] = [];
//     const macdSignalKeeperRes: number[] = [];
//     const macdHistKeeperRes: number[] = [];
//     const macdKeeper = new MacdKeeper({ fastPeriod, slowPeriod, signalPeriod });
//     _.each(close, c => {
//       macdKeeper.add(c);
//       const keeperRes = macdKeeper.get();
//       macdKeeperRes.push(keeperRes.macd);
//       macdSignalKeeperRes.push(keeperRes.macdSignal);
//       macdHistKeeperRes.push(keeperRes.histogram);
//     });
//
//     // compare talib result
//     const talibRes = talib.execute({
//       name: 'MACD',
//       startIdx: 0,
//       endIdx: close.length - 1,
//       inReal: close,
//       optInFastPeriod: fastPeriod,
//       optInSlowPeriod: slowPeriod,
//       optInSignalPeriod: signalPeriod,
//     });
//
//     const lookBackPeriod = signalPeriod + slowPeriod - 2;
//     _.each(talibRes.result.outMACD, (t, i: number) => {
//       expect(Math.abs(t - macdKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
//     });
//
//     _.each(talibRes.result.outMACDSignal, (t, i: number) => {
//       expect(Math.abs(t - macdSignalKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
//     });
//
//     _.each(talibRes.result.outMACDHist, (t, i: number) => {
//       expect(Math.abs(t - macdHistKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
//     });
//   });
// });
