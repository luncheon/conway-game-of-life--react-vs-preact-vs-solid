import zlib from 'zlib'

const displayBytes = bytes => {
  if (bytes > 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1).padStart(6, ' ') + ' MB'
  } else if (bytes > 1024) {
    return (bytes / 1024).toFixed(1).padStart(6, ' ') + ' KB'
  } else {
    return bytes.padStart(6, ' ') + 'B'
  }
}

export default () => ({
  async generateBundle(_, bundle) {
    for (const [filename, chunk] of Object.entries(bundle)) {
      const utf8 = new TextEncoder().encode(chunk.code)
      console.log(filename)
      console.log('  bundle: ' + displayBytes(utf8.byteLength))
      console.log('    gzip: ' + displayBytes(zlib.gzipSync(utf8.buffer, { level: 9 }).byteLength))
      console.log('  brotli: ' + displayBytes(zlib.brotliCompressSync(utf8.buffer).byteLength))
      console.log()
    }
  },
})
