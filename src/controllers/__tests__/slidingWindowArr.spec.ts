import { SlidingWindowArr } from '../slidingWindowArr';

describe('slidingWindowArr', function() {
  it('should work', function() {
    const a1 = new SlidingWindowArr({
      maxLen: 2,
    });

    a1.push(1);
    expect(a1.get(0)).toEqual(1);
    expect(a1.first()).toEqual(1);
    expect(a1.last()).toEqual(1);

    a1.push(2);
    expect(a1.get(0)).toEqual(1);
    expect(a1.get(1)).toEqual(2);
    expect(a1.first()).toEqual(1);
    expect(a1.last()).toEqual(2);

    a1.push(3);
    expect(a1.get(0)).toEqual(2);
    expect(a1.get(1)).toEqual(3);
    expect(a1.first()).toEqual(2);
    expect(a1.last()).toEqual(3);

    a1.push(4);
    expect(a1.get(0)).toEqual(3);
    expect(a1.get(1)).toEqual(4);
    expect(a1.get(-1)).toEqual(4);
    expect(a1.first()).toEqual(3);
    expect(a1.last()).toEqual(4);
  });
});
