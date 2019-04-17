"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function testFunc(input) {
    return _.filter(input, i => i > 0);
}
exports.testFunc = testFunc;
