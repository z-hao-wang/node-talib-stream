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
        const rsiKeeper = new rsiKeeper_1.RsiKeeper({ periods: period });
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
        console.log(`====talibRes.result.outReal`, talibRes.result.outReal.length);
        // for some reason, talib initial results are calculated differently with our approach
        // but over time, the values are trending to equal
        _.each(talibRes.result.outReal, (t, i) => {
            expect(Math.abs(t - rsiKeeperRes[i + period]) < 0.00001).toBeTruthy();
        });
    });
});