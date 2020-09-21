import {nodeResolve} from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './esm/state.js',
  plugins: [
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled'
    })
  ],
  output: {
    exports: 'named',
    file: './state.max.js',
    format: 'iife',
    name: 'stateHandler'
  }
};
