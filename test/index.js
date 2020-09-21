require('basichtml').init({});

const genericHandler = require('../cjs');
const stateHandler = require('../cjs/state');
const domHandler = require('../cjs/dom');
const {noop} = require('../cjs/utils.js');

let element, invoked, reactive, state;

console.assert(typeof genericHandler() === 'function');
console.assert(noop() === void 0);

console.log('  default state handler');
reactive = stateHandler();
invoked = false;
data = [];
state = reactive({prop: '', data}, () => invoked = true);
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');
invoked = false;
data.push(1);
state.data = data;
console.assert(invoked);
console.assert(state.data === data);

console.log('  not shallow state handler');
reactive = stateHandler({shallow: false});
invoked = false;
data = [];
state = reactive({prop: '', data}, () => invoked = true);
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');
invoked = false;
data.push(1);
state.data = data;
console.assert(!invoked);
console.assert(state.data === data);

console.log('  all state handler');
reactive = genericHandler({all: true});
invoked = false;
state = reactive({prop: ''}, () => invoked = true);
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(invoked);
console.assert(state.prop === 'OK');

console.log('  hooked state handler');
reactive = genericHandler({useState: value => [value, () => invoked = true]});
invoked = false;
state = reactive({prop: ''});
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');

console.log('  hooked overloaded handler');
reactive = genericHandler({useState: value => [value, () => invoked = true]});
invoked = false;
state = reactive({prop: ''}, () => {});
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');

console.log('  hooked all handler');
reactive = genericHandler({all: true, useState: value => [value, () => invoked = true]});
invoked = false;
state = reactive({prop: ''});
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(invoked);
console.assert(state.prop === 'OK');

console.log('  default dom handler');
reactive = domHandler();
invoked = false;
element = document.createElement('p');
state = reactive(element, {prop: ''}, () => invoked = true);
console.assert(element === state);
console.assert(state.prop === '');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');

console.log('  default dom handler with property');
reactive = genericHandler({dom: true});
invoked = false;
element = document.createElement('p');
element.prop = 'initial';
state = reactive(element, {prop: ''}, () => invoked = true);
console.assert(element === state);
console.assert(state.prop === 'initial');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');

console.log('  default dom handler with attribute');
reactive = genericHandler({dom: true});
invoked = false;
element = document.createElement('p');
element.setAttribute('prop', 'initial');
state = reactive(element, {prop: ''}, () => invoked = true);
console.assert(element === state);
console.assert(state.prop === 'initial');
state.prop = 'OK';
console.assert(invoked);
invoked = false;
console.assert(state.prop === 'OK');
state.prop = 'OK';
console.assert(!invoked);
console.assert(state.prop === 'OK');


