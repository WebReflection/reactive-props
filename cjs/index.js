'use strict';
const dom = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./dom.js'));
const state = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./state.js'));

module.exports = (options = {}) => (options.dom ? dom : state)(options);
