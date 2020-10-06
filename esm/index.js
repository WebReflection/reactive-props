import dom from './dom.js';
import state from './state.js';

export default (options = {}) => (options.dom ? dom : state)(options);
