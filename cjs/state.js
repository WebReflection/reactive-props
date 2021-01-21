'use strict';
const {defineProperties, loop, noop} = require('./utils.js');

const value = (props, key) => props[key];

module.exports = ({
  all = false,
  shallow = true,
  useState = noop
} = {}) => (props, update) => defineProperties(
  {}, loop(props, value, all, shallow, useState, update)
);
