const {defineProperties, keys} = Object;

const noop = () => {};

const accessor = (all, shallow, hook, value, update) => ({
  configurable: true,
  get: () => value,
  set: _ => {
    if (_ === value) {
      if (all || (shallow && typeof _ === 'object' && _)) {
        if (hook)
          update(value);
        else
          update();
      }
    }
    else {
      value = _;
      if (hook)
        update(value);
      else
        update();
    }
  }
});

const loop = (props, get, all, shallow, useState, update) => {
  const desc = {};
  const fn = update || useState;
  const hook = useState !== noop;
  const args = [all, shallow, hook];
  for (let ke = keys(props), y = 0; y < ke.length; y++) {
    const [value, change] = hook ? useState(get(ke[y])) : [get(ke[y]), fn];
    desc[ke[y]] = accessor.apply(null, args.concat([value, update || change]));
  }
  return desc;
};

export default ({
  all = false,
  shallow = true,
  dom = false,
  getAttribute = (element, key) => element.getAttribute(key),
  useState = noop
} = {}) => dom ?
  (element, props, update) => {
    const value = key => {
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
  } :
  (props, update) => {
    const value = key => props[key];
    const desc = loop(props, value, all, shallow, useState, update);
    return defineProperties({}, desc);
  }
;
