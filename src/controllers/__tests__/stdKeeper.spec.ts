import { StdKeeper } from '../stdKeeper';
import test from 'ava';
// https://math.stackexchange.com/questions/595541/rolling-standard-deviations
test('StdKeeper should work', t => {
  const stdKeeper = new StdKeeper({ period: 6 });
  stdKeeper.add(32);
  stdKeeper.add(47);
  stdKeeper.add(42);
  stdKeeper.add(45);
  stdKeeper.add(80);
  stdKeeper.add(90);

  const normalStd = StdKeeper.standardDeviation([32, 47, 42, 45, 80, 90]);
  t.truthy(normalStd === 21.236760581595302);
  t.truthy(stdKeeper.get() === 21.236760581595302);

  stdKeeper.add(52);
  const normalStd2 = StdKeeper.standardDeviation([47, 42, 45, 80, 90, 52]);
  t.truthy(normalStd2 === 18.61600267392427);
  t.truthy(stdKeeper.get() === 18.6160026739242857);

  stdKeeper.add(159);
  const normalStd3 = StdKeeper.standardDeviation([42, 45, 80, 90, 52, 159]);
  t.truthy(normalStd3 === 40.352612472222084);
  t.truthy(stdKeeper.get() === 40.352612472222084);
});
