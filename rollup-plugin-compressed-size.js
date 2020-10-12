// rollup-plugin-filesize (https://github.com/ritz078/rollup-plugin-filesize) does not work recently... so this is a tiny alternative.
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
    for (const chunk of Object.values(bundle)) {
      const utf8 = new TextEncoder().encode(chunk.code)
      console.log(`${chunk.fileName}
  bundle: ${displayBytes(utf8.byteLength)}
    gzip: ${displayBytes(zlib.gzipSync(utf8.buffer, { level: 9 }).byteLength)}
  brotli: ${displayBytes(zlib.brotliCompressSync(utf8.buffer).byteLength)}
`)
    }
  },
})
