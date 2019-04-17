"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SlidingWindowArr {
    constructor(options) {
        this.arr = [];
        this.cursor = 0;
        this.maxLen = options.maxLen;
    }
    map(func) {
        const ret = new Array(this.arr.length);
        for (let i = 0; i < this.length(); i++) {
            ret[i] = func(this.get(i), i);
        }
        return ret;
    }
    setMaxLen(maxLen) {
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
    push(val) {
        const arr = this.arr;
        if (arr.length < this.maxLen) {
            arr.push(val);
        }
        else {
            arr[this.cursor % this.maxLen] = val;
            this.cursor++;
        }
    }
    get(i) {
        if (i >= this.arr.length) {
            console.error(`index ${i} cannot be larger than arr length ${this.arr.length}`);
        }
        let newI = i;
        if (i < 0) {
            newI = this.arr.length + i;
        }
        return this.arr[(this.cursor + newI) % this.maxLen];
    }
    set(i, item) {
        if (i >= this.arr.length) {
            console.error(`index ${i} cannot be larger than arr length ${this.arr.length}`);
        }
        this.arr[(this.cursor + i) % this.maxLen] = item;
    }
    first() {
        if (this.arr.length === 0)
            return undefined;
        return this.get(0);
    }
    last() {
        if (this.arr.length === 0)
            return undefined;
        return this.get(this.arr.length - 1);
    }
    length() {
        return this.arr.length;
    }
    isFull() {
        return this.arr.length === this.maxLen;
    }
}
exports.SlidingWindowArr = SlidingWindowArr;
