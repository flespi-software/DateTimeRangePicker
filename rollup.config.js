import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { eslint } from 'rollup-plugin-eslint'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ignore from 'rollup-plugin-ignore'
import autoExternal from 'rollup-plugin-auto-external'
import { uglify } from 'rollup-plugin-uglify'

const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const lintOpts = {
  extensions,
  cache: true,
  throwOnError: true
}

const prodPlugins = [
  ignore(['quasar', 'vue']),
  autoExternal({
    dependencies: true,
    peerDependencies: true
  }),
  resolve({
    jail: '/src'
  }),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  commonjs(),
  buble(),
  uglify()
]
const devPlugins = [
  eslint(lintOpts),
  bundleSize()
]

let plugins = isProduction ? prodPlugins : [...devPlugins, ...prodPlugins]

export default {
  plugins,
  input: 'src/index.js',
  output: {
    globals,
    name: 'datetimerangepicker',
    sourcemap: true,
    file: 'dist/datetimerangepicker.js',
    format: 'umd',
    exports: 'named'
  }
}
