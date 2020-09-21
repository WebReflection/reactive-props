import {defineProperties} from './object.js';
import {loop, noop} from './utils.js';

export default ({
  all = false,
  shallow = true,
  useState = noop,
  getAttribute = (element, key) => element.getAttribute(key)
} = {}) => (element, props, update) => {
  const value = (props, key) => {
    let result = props[key];
    if (element.hasOwnProperty(key)) {
      result = element[key];
      delete element[key];
    }
    else if (element.hasAttribute(key))
      result = getAttribute(element, key);
    return result;
  };
  const desc = loop(props, value, all, shallow, useState, update);
  return defineProperties(element, desc);
};
