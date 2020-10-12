import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import compressedSize from '../rollup-plugin-compressed-size'

export default {
  input: 'solid-index.tsx',
  output: {
    format: 'iife',
    file: 'solid-index.js',
  },
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    babel({
      presets: ['solid', '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    terser({ format: { comments: false } }),
    compressedSize(),
  ],
  watch: { clearScreen: false },
}
