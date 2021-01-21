import {defineProperties, loop, noop} from './utils.js';

const value = (props, key) => props[key];

export default ({
  all = false,
  shallow = true,
  useState = noop
} = {}) => (props, update) => defineProperties(
  {}, loop(props, value, all, shallow, useState, update)
);
