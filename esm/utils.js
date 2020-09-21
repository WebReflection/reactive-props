import {keys} from './object.js';

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

export const loop = (props, get, all, shallow, useState, update) => {
  const desc = {};
  const hook = useState !== noop;
  const args = [all, shallow, hook];
  for (let ke = keys(props), y = 0; y < ke.length; y++) {
    const value = get(props, ke[y]);
    const extras = hook ? useState(value) : [value, useState];
    if (update)
      extras[1] = update;
    desc[ke[y]] = accessor.apply(null, args.concat(extras));
  }
  return desc;
};

export const noop = () => {};