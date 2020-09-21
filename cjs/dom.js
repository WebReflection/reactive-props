'use strict';
const {defineProperties} = require('./object.js');
const {loop, noop} = require('./utils.js');

module.exports = ({
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
