"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medianKeeper_1 = require("../medianKeeper");
const _ = require("lodash");
const sampleCandles_1 = require("./sampleCandles");
describe('MedianKeeper', () => {
    it('should work', () => {
        const period = 10;
        const close = _.map(sampleCandles_1.sampleCandles, c => c.last).slice(0, 15);
        const results = [];
        const medianKeeper = new medianKeeper_1.MedianKeeper({ period });
        _.each(close, c => {
            medianKeeper.add(c);
            const keeperRes = medianKeeper.get();
            results.push(medianKeeper.get());
        });
        expect(results).toMatchSnapshot();
    });
});
