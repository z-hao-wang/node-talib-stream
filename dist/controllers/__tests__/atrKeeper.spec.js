"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atrKeeper_1 = require("../atrKeeper");
const _ = require("lodash");
const talib = require('talib');
const sampleCandles_1 = require("./sampleCandles");
describe('atrKeeper', () => {
    it('should match talib', () => {
        const period = 3;
        const high = _.map(sampleCandles_1.sampleCandles, c => c.max);
        const close = _.map(sampleCandles_1.sampleCandles, c => c.last);
        const low = _.map(sampleCandles_1.sampleCandles, c => c.min);
        const atrKeeperRes = [];
        const atrKeeper = new atrKeeper_1.AtrKeeper({ periods: period });
        _.each(sampleCandles_1.sampleCandles, c => {
            atrKeeper.add({
                close: c.last,
                high: c.max,
                low: c.min,
            });
            atrKeeperRes.push(atrKeeper.get());
        });
        // compare talib result
        const talibRes = talib.execute({
            name: 'ATR',
            startIdx: 0,
            endIdx: close.length - 1,
            close,
            high,
            low,
            optInTimePeriod: period,
        });
        _.each(talibRes.result.outReal, (t, i) => {
            expect(Math.abs(t - atrKeeperRes[i + period]) < 0.00001).toBeTruthy();
        });
    });
});
