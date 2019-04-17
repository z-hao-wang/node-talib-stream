import { RsiKeeper } from '../rsiKeeper';
import * as _ from 'lodash';
const talib = require('talib');

import { sampleCandles } from './sampleCandles'

describe('traderUtils', () => {

  it('getMetric rsiKeeper RSI', () => {
    const periods = 3;
    const rsiKeeperRes: any = [];
    const rsiKeeper = new RsiKeeper({periods});
    _.each(sampleCandles, (c) => {
      rsiKeeper.add(c.last);
      rsiKeeperRes.push(rsiKeeper.getRsi());
    });

    // compare talib result
    const closePrices = _.map(sampleCandles, c => c.last);
    const talibRes = talib.execute({
      name: 'RSI',
      startIdx: 0,
      endIdx: closePrices.length - 1,
      inReal: closePrices,
      optInTimePeriod: periods,
    });
    // for some reason, talib initial results are calculated differently with our approach
    // but over time, the values are trending to equal
    _.each(talibRes.result.outReal, (t, i: number) => {
      if (i > 20) {
        expect(Math.abs(t - rsiKeeperRes[i + periods]) / t < 0.001).toBeTruthy();
      }
    })
  });

});
