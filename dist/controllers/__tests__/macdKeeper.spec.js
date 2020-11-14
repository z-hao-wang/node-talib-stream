"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const macdKeeper_1 = require("../macdKeeper");
const _ = require("lodash");
const talib = require('talib');
const sampleCandles_1 = require("./sampleCandles");
describe('macdKeeper', () => {
    it('should match talib', () => {
        const fastPeriod = 12;
        const slowPeriod = 26;
        const signalPeriod = 9;
        const close = _.map(sampleCandles_1.sampleCandles, c => c.last);
        const macdKeeperRes = [];
        const macdSignalKeeperRes = [];
        const macdHistKeeperRes = [];
        const macdKeeper = new macdKeeper_1.MacdKeeper({ fastPeriod, slowPeriod, signalPeriod });
        _.each(close, c => {
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
        _.each(talibRes.result.outMACD, (t, i) => {
            expect(Math.abs(t - macdKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
        });
        _.each(talibRes.result.outMACDSignal, (t, i) => {
            expect(Math.abs(t - macdSignalKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
        });
        _.each(talibRes.result.outMACDHist, (t, i) => {
            expect(Math.abs(t - macdHistKeeperRes[i + lookBackPeriod]) < 0.00001).toBeTruthy();
        });
    });
});
