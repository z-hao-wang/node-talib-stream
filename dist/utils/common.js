"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.squareSum = exports.sum = void 0;
function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}
exports.sum = sum;
function squareSum(arr) {
    return arr.reduce((acc, v) => acc + v * v, 0);
}
exports.squareSum = squareSum;
