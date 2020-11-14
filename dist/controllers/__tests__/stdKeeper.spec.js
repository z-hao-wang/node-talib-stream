"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stdKeeper_1 = require("../stdKeeper");
// https://math.stackexchange.com/questions/595541/rolling-standard-deviations
describe('StdKeeper', () => {
    it('should work', () => {
        const stdKeeper = new stdKeeper_1.StdKeeper({ period: 6 });
        stdKeeper.add(32);
        stdKeeper.add(47);
        stdKeeper.add(42);
        stdKeeper.add(45);
        stdKeeper.add(80);
        stdKeeper.add(90);
        const normalStd = stdKeeper_1.StdKeeper.standardDeviation([32, 47, 42, 45, 80, 90]);
        expect(normalStd).toEqual(21.236760581595302);
        expect(stdKeeper.get()).toEqual(21.236760581595302);
        stdKeeper.add(52);
        const normalStd2 = stdKeeper_1.StdKeeper.standardDeviation([47, 42, 45, 80, 90, 52]);
        expect(normalStd2).toEqual(18.61600267392427);
        expect(stdKeeper.get()).toEqual(18.6160026739242857);
        stdKeeper.add(159);
        const normalStd3 = stdKeeper_1.StdKeeper.standardDeviation([42, 45, 80, 90, 52, 159]);
        expect(normalStd3).toEqual(40.352612472222084);
        expect(stdKeeper.get()).toEqual(40.352612472222084);
    });
});
