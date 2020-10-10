import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import compressedSize from '../rollup-plugin-compressed-size'

export default {
  input: 'index.tsx',
  output: {
    format: 'iife',
    file: 'index.js',
  },
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
    babel({
      presets: ['solid', '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    terser(),
    compressedSize(),
  ],
  watch: { clearScreen: false },
}
