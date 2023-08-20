// import { AdxKeeper } from '../adxKeeper';
// import * as _ from 'lodash';
// const talib = require('talib');
//
// import { sampleCandles } from './sampleCandles';
//
// describe('adxKeeper', () => {
//   it('should match talib', () => {
//     const period = 3;
//     const high = sampleCandles.map(c => c.max);
//     const close = sampleCandles.map(c => c.last);
//     const low = sampleCandles.map(c => c.min);
//
//     const adxKeeperRes: number[] = [];
//     const adxKeeper = new AdxKeeper({ period: period });
//     _.each(sampleCandles, c => {
//       adxKeeper.add({
//         close: c.last,
//         high: c.max,
//         low: c.min,
//       });
//       adxKeeperRes.push(adxKeeper.get());
//     });
//
//     // compare talib result
//     const talibRes = talib.execute({
//       name: 'ADX',
//       startIdx: 0,
//       endIdx: close.length - 1,
//       close,
//       high,
//       low,
//       optInTimePeriod: period,
//     });
//     _.each(talibRes.result.outReal, (t, i: number) => {
//       expect(Math.abs(t - adxKeeperRes[i + period * 2 - 1]) < 0.00001).toBeTruthy();
//     });
//   });
// });
