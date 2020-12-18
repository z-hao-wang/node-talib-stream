"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsiKeeper_1 = require("../rsiKeeper");
const _ = require("lodash");
const talib = require('talib');
const sampleCandles_1 = require("./sampleCandles");
describe('rsiKeeper', () => {
    it('should match talib', () => {
        const period = 3;
        const rsiKeeperRes = [];
        const rsiKeeper = new rsiKeeper_1.RsiKeeper({ period: period });
        _.each(sampleCandles_1.sampleCandles, c => {
            rsiKeeper.add(c.last);
            rsiKeeperRes.push(rsiKeeper.get());
        });
        // compare talib result
        const closePrices = _.map(sampleCandles_1.sampleCandles, c => c.last);
        const talibRes = talib.execute({
            name: 'RSI',
            startIdx: 0,
            endIdx: closePrices.length - 1,
            inReal: closePrices,
            optInTimePeriod: period,
        });
        _.each(talibRes.result.outReal, (t, i) => {
            expect(Math.abs(t - rsiKeeperRes[i + period]) < 0.00001).toBeTruthy();
        });
    });
});
