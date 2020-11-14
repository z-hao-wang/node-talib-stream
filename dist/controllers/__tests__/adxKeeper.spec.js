"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adxKeeper_1 = require("../adxKeeper");
const _ = require("lodash");
const talib = require('talib');
const sampleCandles_1 = require("./sampleCandles");
describe('adxKeeper', () => {
    it('should match talib', () => {
        const period = 3;
        const high = _.map(sampleCandles_1.sampleCandles, c => c.max);
        const close = _.map(sampleCandles_1.sampleCandles, c => c.last);
        const low = _.map(sampleCandles_1.sampleCandles, c => c.min);
        const adxKeeperRes = [];
        const adxKeeper = new adxKeeper_1.AdxKeeper({ period: period });
        _.each(sampleCandles_1.sampleCandles, c => {
            adxKeeper.add({
                close: c.last,
                high: c.max,
                low: c.min,
            });
            adxKeeperRes.push(adxKeeper.get());
        });
        // compare talib result
        const talibRes = talib.execute({
            name: 'ADX',
            startIdx: 0,
            endIdx: close.length - 1,
            close,
            high,
            low,
            optInTimePeriod: period,
        });
        _.each(talibRes.result.outReal, (t, i) => {
            expect(Math.abs(t - adxKeeperRes[i + period * 2 - 1]) < 0.00001).toBeTruthy();
        });
    });
});
