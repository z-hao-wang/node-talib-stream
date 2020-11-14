"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smaKeeper_1 = require("../smaKeeper");
const _ = require("lodash");
const talib = require('talib');
const sampleCandles_1 = require("./sampleCandles");
exports.MATypes = {
    SMA: 0,
    EMA: 1,
    WMA: 2,
    DEMA: 3,
    TEMA: 4,
    TRIMA: 5,
    KAMA: 6,
    MAMA: 7,
    T3: 8,
};
describe('emaKeeper', () => {
    it('should match talib', () => {
        const period = 3;
        const close = _.map(sampleCandles_1.sampleCandles, c => c.last);
        const emaKeeperRes = [];
        const emaKeeper = new smaKeeper_1.SmaKeeper({ period: period });
        _.each(close, c => {
            emaKeeper.add(c);
            emaKeeperRes.push(emaKeeper.get());
        });
        // compare talib result
        const talibRes = talib.execute({
            name: 'MA',
            optInMAType: exports.MATypes.SMA,
            startIdx: 0,
            endIdx: close.length - 1,
            inReal: close,
            optInTimePeriod: period,
        });
        _.each(talibRes.result.outReal, (t, i) => {
            expect(Math.abs(t - emaKeeperRes[i + period - 1]) < 0.00001).toBeTruthy();
        });
    });
});
