import test from 'ava';
import { MedianKeeper } from '../medianKeeper';

import { sampleCandles } from './sampleCandles';

test('MedianKeeper should work', t => {
  const period = 10;
  const close = sampleCandles.map(c => c.last).slice(0, 15);
  const results: number[] = [];

  const medianKeeper = new MedianKeeper({ period });
  close.forEach(c => {
    medianKeeper.add(c);
    const keeperRes = medianKeeper.get();
    results.push(medianKeeper.get());
  });

  t.snapshot(results);
});
