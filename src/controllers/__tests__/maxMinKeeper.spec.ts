import { MaxMinKeeper } from '../maxMinKeeper';
describe('MaxMinKeeper', () => {
  it('should work', () => {
    const m = new MaxMinKeeper({ period: 3 });
    m.add(10);
    expect(m.getMax()).toBe(10);
    expect(m.getMin()).toBe(10);
    m.add(11);
    expect(m.getMax()).toBe(11);
    expect(m.getMin()).toBe(10);
    m.add(9);
    expect(m.getMax()).toBe(11);
    expect(m.getMin()).toBe(9);

    m.add(5);
    m.add(4);
    expect(m.getMax()).toBe(9);
    expect(m.getMin()).toBe(4);
    m.add(3);
    expect(m.getMax()).toBe(5);
    expect(m.getMin()).toBe(3);
  });
});
