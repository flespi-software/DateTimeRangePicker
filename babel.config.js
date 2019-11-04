module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    [
      '@babel/transform-runtime', {
        regenerator: false
      }
    ]
  ]
}
