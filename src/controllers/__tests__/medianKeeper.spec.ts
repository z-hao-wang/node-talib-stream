// import { MedianKeeper } from '../medianKeeper';
// import * as _ from 'lodash';
//
// import { sampleCandles } from './sampleCandles';
//
// describe('MedianKeeper', () => {
//   it('should work', () => {
//     const period = 10;
//     const close = _.map(sampleCandles, c => c.last).slice(0, 15);
//     const results: number[] = [];
//
//     const medianKeeper = new MedianKeeper({ period });
//     _.each(close, c => {
//       medianKeeper.add(c);
//       const keeperRes = medianKeeper.get();
//       results.push(medianKeeper.get());
//     });
//     expect(results).toMatchSnapshot();
//   });
// });
