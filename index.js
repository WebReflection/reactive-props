self.reactiveProps = (function (exports) {
  'use strict';

  

  var defineProperties = Object.defineProperties,
      keys = Object.keys;

  var accessor = function accessor(all, shallow, hook, value, update) {
    return {
      configurable: true,
      get: function get() {
        return value;
      },
      set: function set(_) {
        if (all || _ !== value || shallow && typeof(_) === 'object' && _) {
          value = _;
          if (hook) update.call(this, value);else update.call(this);
        }
      }
    };
  };

  var loop = function loop(props, get, all, shallow, useState, update) {
    var desc = {};
    var hook = useState !== noop;
    var args = [all, shallow, hook];

    for (var ke = keys(props), y = 0; y < ke.length; y++) {
      var value = get(props, ke[y]);
      var extras = hook ? useState(value) : [value, useState];
      if (update) extras[1] = update;
      desc[ke[y]] = accessor.apply(null, args.concat(extras));
    }

    return desc;
  };

  var noop = function noop() {};

  var dom = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$all = _ref.all,
        all = _ref$all === void 0 ? false : _ref$all,
        _ref$shallow = _ref.shallow,
        shallow = _ref$shallow === void 0 ? true : _ref$shallow,
        _ref$useState = _ref.useState,
        useState = _ref$useState === void 0 ? noop : _ref$useState,
        _ref$getAttribute = _ref.getAttribute,
        getAttribute = _ref$getAttribute === void 0 ? function (element, key) {
      return element.getAttribute(key);
    } : _ref$getAttribute;

    return function (element, props, update) {
      var value = function value(props, key) {
        var result = props[key],
            type = typeof(result);

        if (element.hasOwnProperty(key)) {
          result = element[key];
          delete element[key];
        } else if (element.hasAttribute(key)) {
          result = getAttribute(element, key);
          if (type == 'number') result = +result;else if (type == 'boolean') result = !/^(?:false|0|)$/.test(result);
        }

        return result;
      };

      var desc = loop(props, value, all, shallow, useState, update);
      return defineProperties(element, desc);
    };
  });

  var value = function value(props, key) {
    return props[key];
  };

  var state = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$all = _ref.all,
        all = _ref$all === void 0 ? false : _ref$all,
        _ref$shallow = _ref.shallow,
        shallow = _ref$shallow === void 0 ? true : _ref$shallow,
        _ref$useState = _ref.useState,
        useState = _ref$useState === void 0 ? noop : _ref$useState;

    return function (props, update) {
      return defineProperties({}, loop(props, value, all, shallow, useState, update));
    };
  });

  var index = (function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (options.dom ? dom : state)(options);
  });

  return index;

  return exports;

}({}));
