# reactive-props

[![Build Status](https://travis-ci.com/WebReflection/reactive-props.svg?branch=master)](https://travis-ci.com/WebReflection/reactive-props) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/reactive-props/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/reactive-props?branch=master)

An all-in-one implementation of the [Reactive State for Data & DOM](https://medium.com/@WebReflection/reactive-state-for-data-dom-78332ddafd0e) patterns, compatible down to IE9.


### Live Examples

  * **[test page](https://webreflection.github.io/reactive-props/test/)** to be sure your target browser is compatible (IE9+)
  * **[wickedElements](https://github.com/WebReflection/wicked-elements#readme)** usage [live demo](https://codepen.io/WebReflection/pen/RwaYzjE)
  * **[µce](https://github.com/WebReflection/uce#readme)** usage [live demo](https://codepen.io/WebReflection/pen/LYNJwoV)
  * **[µland](https://github.com/WebReflection/uland#readme)** usage [live demo](https://codepen.io/WebReflection/pen/YzqOoRB)
  * **[hookedElements](https://github.com/WebReflection/hooked-elements#readme)** usage [live demo](https://codepen.io/WebReflection/pen/qBZMJeX)


## API

This module exports a default helper function that can create utilities to define reactive properties / states for data or DOM elements.
For documentation sake, this function will be named `createHandler`, and it accepts an optional configuration object, with the following properties:

  * `all:boolean`, signals that all set properties should invoke the related update. If `true`, even if a property has the same value it had before, the related update function will be invoked.
  * `shallow:boolean`, signals that that even if the property value is the same, the update should happen in case it's the same object, or the same array, set before. If `false`, and `all = false` too (default), no update happens in case the object is the exact same as before.
  * `dom:boolean`, signals that properties will be attached to a DOM element, which needs to be passed along. By default, the returned utility to create reactive properties has a `(props[, update])` signature, but when `dom = true`, the returned helper will have a `(element, props[, update])` signature. By default, `dom` is `false.
  * `getAttribute(element, key):any` is an optional helper to retrieve the right value when `dom = true` and the element already had an attribute with the reactive property name. `<element checked="true">` will pass to this helper the `element` reference and the `checked` attribute name. By default, this helper returns `element.getAttribute("checked")`, but it is possible to return `JSON.parse(element.getAttribute("checked"))` instead, so that the initial `element.checked` will return a proper boolean value.
  * `useState(value):void` is an optional helper that accepts any generic `useState` handler from any *hooks* based library. If provided, it will be invoked passing along the new value when all conditions are match (see previous `all` and `shallow` description)

The resulting helper returns either the `state` object with reactive properties, or the passed `element`.

```js
// for reactive states
const reactiveProps = createHandler();
const state = reactiveProps({...}, update);

// for reactive elements
const reactiveElement = createHandler({dom: true});
const el = reactiveElement(document.querySelector('el'), {...}, update);
```

If an `update` function is provided, it will be used to invoke state changes per each update, bypassing the possible `useState`.


```js
import {useState} from 'augmentor';

const reactiveProps = createHandler({useState});
const state = reactiveProps({test: ''});
state.test = 'OK';
// will invoke useState('OK')

const overload = reactiveProps({test: ''}, console.log);
overload.test = 'OK';
// will simply log "OK" without invoking useState("OK")
```


#### Default Use Cases

The default value goal of all options is to cover these common use cases:

  * *primitive properties* that would trigger updates only if different
  * *non immutable data* that would trigger updates if properties are objects/arrays. Use `shallow = false` option if data is granted to be immutable deep down each inner value
  * *integrated hooks* to work within a variety of libraries that offer a `useState` hook

For any other combined use case, please refer to [the related post](https://medium.com/@WebReflection/reactive-state-for-data-dom-78332ddafd0e) and find out your fine tuned reactive state handler.


#### Partial Imports

If all you need is either the *state handler* or the *dom handler*, it is possible to import just those two separately, resulting in a slightly smaller bundle.

```js
// const genericHandler = require('reactive-props');
import genericHandler from 'reactive-props';

// const domHandler = require('reactive-props/dom');
import domHandler from 'reactive-props/dom';

// produces same results
domHandler();
genericHandler({dom: true});

// const stateHandler = require('reactive-props/state');
import stateHandler from 'reactive-props/state';

// produces same results
stateHandler();
genericHandler({dom: false});
```


### Basic Example

```js
// const createHandler = require('reactive-props');
import createHandler from 'reactive-props';

const reactiveProps = createHandler();
const reactiveElement = createHandler({dom: true});

// create reactive props
const state = reactiveProps(
  // props to react for
  {test: ''},
  // called on each prop update
  () => console.log(state)
);

state.test;           // ""
state.test = 'value'; // {"test":"value"}

// create reactive elements
const body = reactiveElement(
  document.body,
  {test: ''},
  () => console.log('body.test', body.test)
);

body.test;           // ""
body.test = 'value'; // body.test "value"
```
