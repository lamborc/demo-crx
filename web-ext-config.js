module.exports = {
  verbose:false,
  artifactsDir: 'build/',
  sourceDir:'add-on/',
  ignoreFiles: [
    'src/',
    '*.map',
    'manifest.*.json'
  ],
  build: {
    overwriteDest: true
  }
}