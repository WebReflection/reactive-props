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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var defineProperties = Object.defineProperties,
      keys = Object.keys;

  var noop = function noop() {};

  var accessor = function accessor(all, shallow, hook, value, update) {
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
    var fn = update || useState;
    var hook = useState !== noop;
    var args = [all, shallow, hook];

    for (var ke = keys(props), y = 0; y < ke.length; y++) {
      var _ref = hook ? useState(get(ke[y])) : [get(ke[y]), fn],
          _ref2 = _slicedToArray(_ref, 2),
          value = _ref2[0],
          change = _ref2[1];

      desc[ke[y]] = accessor.apply(null, args.concat([value, update || change]));
    }

    return desc;
  };

  var index = (function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$all = _ref3.all,
        all = _ref3$all === void 0 ? false : _ref3$all,
        _ref3$shallow = _ref3.shallow,
        shallow = _ref3$shallow === void 0 ? true : _ref3$shallow,
        _ref3$dom = _ref3.dom,
        dom = _ref3$dom === void 0 ? false : _ref3$dom,
        _ref3$getAttribute = _ref3.getAttribute,
        getAttribute = _ref3$getAttribute === void 0 ? function (element, key) {
      return element.getAttribute(key);
    } : _ref3$getAttribute,
        _ref3$useState = _ref3.useState,
        useState = _ref3$useState === void 0 ? noop : _ref3$useState;

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
