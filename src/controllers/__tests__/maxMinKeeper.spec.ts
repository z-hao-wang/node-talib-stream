import { MaxMinKeeper } from '../maxMinKeeper';
import test from 'ava';
//check the max&min is specific value of not
test('MaxMinKeeper should work', t => {
  const m = new MaxMinKeeper({ period: 3 });
  m.add(10);
  t.truthy(m.getMax() === 10);
  t.truthy(m.getMin() === 10);
  m.add(11);
  t.truthy(m.getMax() === 11);
  t.truthy(m.getMin() === 10);
  m.add(9);
  t.truthy(m.getMax() === 11);
  t.truthy(m.getMin() === 9);

  m.add(5);
  m.add(4);
  t.truthy(m.getMax() === 9);
  t.truthy(m.getMin() === 4);
  m.add(3);
  t.truthy(m.getMax() === 5);
  t.truthy(m.getMin() === 3);
});

test('MaxMinKeeper speed', t => {
  const m = new MaxMinKeeper({ period: 300 });
  const startTs = Date.now();
  for (let i = 0; i < 1000000; i++) {
    m.add(Math.random());
  }
  console.log(`time cost = ${Date.now() - startTs}`);

  t.pass();
});
