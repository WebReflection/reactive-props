import {defineProperties, loop, noop} from './utils.js';

export default ({
  all = false,
  shallow = true,
  useState = noop,
  getAttribute = (element, key) => element.getAttribute(key)
} = {}) => (element, props, update) => {
  const value = (props, key) => {
    let result = props[key], type = typeof result;
    if (element.hasOwnProperty(key)) {
      result = element[key];
      delete element[key];
    }
    else if (element.hasAttribute(key)) {
      result = getAttribute(element, key);
      if (type == 'number')
        result = +result;
      else if (type == 'boolean')
        result = !/^(?:false|0|)$/.test(result);
    }
    return result;
  };
  const desc = loop(props, value, all, shallow, useState, update);
  return defineProperties(element, desc);
};
