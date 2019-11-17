"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sliding_window_arr_1 = require("sliding-window-arr");
const Deque = require('collections/deque');
// algorithm source https://www.nayuki.io/page/sliding-window-minimum-maximum-algorithm
// https://www.nayuki.io/res/sliding-window-minimum-maximum-algorithm/slidingwindowminmax.py
class MaxMinKeeper {
    constructor(props) {
        this.maxLen = props.period;
        this.valuesArr = new sliding_window_arr_1.SlidingWindowArr({ maxLen: this.maxLen });
        this.maxArr = new Deque([]);
        this.minArr = new Deque([]);
    }
    addTail(value) {
        while (this.minArr.length > 0 && value < this.minArr.peekBack()) {
            this.minArr.pop();
        }
        this.minArr.push(value);
        while (this.maxArr.length > 0 && value > this.maxArr.peekBack()) {
            this.maxArr.pop();
        }
        this.maxArr.push(value);
    }
    removeHead(value) {
        if (value < this.minArr.peek()) {
            throw new Error(`wrong minArr value ${value} min=${this.minArr.peek()}`);
        }
        else if (value === this.minArr.peek()) {
            this.minArr.shift();
        }
        if (value > this.maxArr.peek()) {
            throw new Error(`wrong maxArr value ${value} max=${this.maxArr.peek()}`);
        }
        else if (value === this.maxArr.peek()) {
            this.maxArr.shift();
        }
    }
    add(value) {
        if (this.valuesArr.length() === this.maxLen) {
            this.removeHead(this.valuesArr.first());
        }
        this.addTail(value);
        this.valuesArr.push(value);
    }
    getLen() {
        return this.valuesArr.length();
    }
    getMax() {
        return this.maxArr.peek();
    }
    getMin() {
        return this.minArr.peek();
    }
    getMaxLen() {
        return this.maxLen;
    }
    debug() {
        console.log(`max=${this.getMax()} getMin=${this.getMin()}`);
    }
}
exports.MaxMinKeeper = MaxMinKeeper;
