import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import compressedSize from '../rollup-plugin-compressed-size'

export default {
  input: 'index.tsx',
  output: {
    format: 'iife',
    file: 'index.js',
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': '"production"' }),
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
    babel({
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    terser(),
    compressedSize(),
  ],
  watch: { clearScreen: false },
}
