import babel from '@rollup/plugin-babel'
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
    babel({
      presets: [['@babel/preset-typescript', { jsxPragma: 'h' }]],
      plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'h' }]],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    terser(),
    compressedSize(),
  ],
  watch: { clearScreen: false },
}