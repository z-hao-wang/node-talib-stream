"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slidingWindowArr_1 = require("./slidingWindowArr");
const Heap = require('collections/heap');
class MedianKeeper {
    constructor(props) {
        this.maxHeap = new Heap();
        this.minHeap = new Heap([], null, (a, b) => b - a);
        this.maxLen = props.period;
        this.valuesArr = new slidingWindowArr_1.SlidingWindowArr({ maxLen: this.maxLen });
    }
    add(value) {
        let success = true;
        if (this.valuesArr.length() == this.maxLen) {
            // need to remove the old value first.
            const firstVal = this.valuesArr.first();
            let deleted = false;
            if (firstVal <= this.maxHeap.peek()) {
                deleted = this.maxHeap.delete(firstVal);
            }
            if (firstVal >= this.minHeap.peek() && !deleted) {
                deleted = deleted || this.minHeap.delete(firstVal);
            }
            if (!deleted) {
                console.error(`failed to delete from heap value=${value} firstVal=${firstVal} maxHeap=${this.maxHeap.peek()} minHeap=${this.minHeap.peek()} arrLen=${this.valuesArr.length()} maxLen=${this.maxLen}`);
                success = false;
            }
        }
        this.valuesArr.push(value);
        if (this.maxHeap.length === 0 || value <= this.maxHeap.peek()) {
            this.maxHeap.push(value);
        }
        else {
            this.minHeap.push(value);
        }
        while (this.maxHeap.length - this.minHeap.length > 1) {
            // shift from maxHeap to min Heap
            this.minHeap.push(this.maxHeap.pop());
        }
        while (this.minHeap.length - this.maxHeap.length > 1) {
            // shift from maxHeap to min Heap
            this.maxHeap.push(this.minHeap.pop());
        }
        return success;
    }
    get() {
        if (this.minHeap.length === 0)
            return this.maxHeap.peek();
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
}
exports.MedianKeeper = MedianKeeper;
