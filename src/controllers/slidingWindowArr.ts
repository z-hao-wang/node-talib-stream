export namespace SlidingWindowArr {
  export interface Options {
    maxLen: number;
  }
}

export class SlidingWindowArr<T = number> {
  private arr: T[] = [];
  private maxLen: number;
  private cursor: number = 0;

  constructor(options: SlidingWindowArr.Options) {
    this.maxLen = options.maxLen;
  }

  map<RET_T = number>(func: (value: T, index: number) => RET_T) {
    const ret = new Array(this.arr.length);
    for (let i = 0; i < this.length(); i++) {
      ret[i] = func(this.get(i), i);
    }
    return ret;
  }

  setMaxLen(maxLen: number) {
    if (this.arr.length > 0) {
      console.error('error! setting maxLen with arr length > 0');
    }
    this.maxLen = maxLen;
  }

  toUnorderedArr() {
    return this.arr;
  }

  toOrderedArr() {
    const ret = new Array(this.arr.length);
    for (let i = 0; i < this.arr.length; i++) {
      ret[i] = this.get(i);
    }
    return ret;
  }

  getMaxLen() {
    return this.maxLen;
  }

  push(val: T) {
    const arr = this.arr;
    if (arr.length < this.maxLen) {
      arr.push(val);
    } else {
      arr[this.cursor % this.maxLen] = val;
      this.cursor++;
    }
  }

  get(i: number): T {
    if (i >= this.arr.length) {
      console.error(`index ${i} cannot be larger than arr length ${this.arr.length}`);
    }
    let newI = i;
    if (i < 0) {
      newI = this.arr.length + i;
    }
    return this.arr[(this.cursor + newI) % this.maxLen];
  }

  set(i: number, item: T) {
    if (i >= this.arr.length) {
      console.error(`index ${i} cannot be larger than arr length ${this.arr.length}`);
    }
    this.arr[(this.cursor + i) % this.maxLen] = item;
  }

  first() {
    if (this.arr.length === 0) return undefined;
    return this.get(0);
  }

  last() {
    if (this.arr.length === 0) return undefined;
    return this.get(this.arr.length - 1);
  }

  length() {
    return this.arr.length;
  }

  isFull() {
    return this.arr.length === this.maxLen;
  }
}
