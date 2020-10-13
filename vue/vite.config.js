import path from 'path'

module.exports = {
  base: '.',
  assetsDir: '.',
  alias: {
    '/common/': path.resolve(__dirname, '../common/'),
  },
}
