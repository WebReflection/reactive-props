self.reactiveState = (function (exports) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var defineProperties = Object.defineProperties,
      keys = Object.keys;

  var noop = function noop() {};

  var accessor = function accessor(value, all, shallow, hook, update) {
    return {
      get: function get() {
        return value;
      },
      set: function set(_) {
        if (_ === value) {
          if (all || shallow && _typeof(_) === 'object' && _) {
            if (hook) update(value);else update();
          }
        } else {
          value = _;
          if (hook) update(value);else update();
        }
      }
    };
  };

  var loop = function loop(props, all, shallow, useState, update, get) {
    var desc = {};
    var hook = useState !== noop;

    for (var ke = keys(props), y = 0; y < ke.length; y++) {
      desc[ke[y]] = accessor(get(ke[y]), all, shallow, hook, update || useState);
    }

    return desc;
  };

  var index = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$all = _ref.all,
        all = _ref$all === void 0 ? false : _ref$all,
        _ref$shallow = _ref.shallow,
        shallow = _ref$shallow === void 0 ? true : _ref$shallow,
        _ref$dom = _ref.dom,
        dom = _ref$dom === void 0 ? false : _ref$dom,
        _ref$getAttribute = _ref.getAttribute,
        getAttribute = _ref$getAttribute === void 0 ? function (element, key) {
      return element.getAttribute(key);
    } : _ref$getAttribute,
        _ref$useState = _ref.useState,
        useState = _ref$useState === void 0 ? noop : _ref$useState;

    return dom ? function (element, props, update) {
      var value = function value(key) {
        var result = props[key];

        if (element.hasOwnProperty(key)) {
          result = element[key];
          delete element[key];
        } else if (element.hasAttribute(key)) result = getAttribute(element, key);

        return result;
      };

      var desc = loop(props, all, shallow, useState, update, value);
      return defineProperties(element, desc);
    } : function (props, update) {
      var value = function value(key) {
        return props[key];
      };

      var desc = loop(props, all, shallow, useState, update, value);
      return defineProperties({}, desc);
    };
  });

  exports.default = index;

  return exports;

}({}).default);
