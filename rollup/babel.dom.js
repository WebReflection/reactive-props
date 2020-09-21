import {nodeResolve} from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './esm/dom.js',
  plugins: [
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled'
    })
  ],
  output: {
    exports: 'named',
    file: './dom.max.js',
    format: 'iife',
    name: 'domHandler'
  }
};
