export const rangeMap = <T>(end: number, selector: (index: number) => T): T[] => {
  const result: T[] = Array(end)
  for (let i = 0; i < end; i++) {
    result[i] = selector(i)
  }
  return result
}

export const animate = (callback: () => void, fpsCallback: (fps: number) => void) => {
  let callbackCount = 0
  let previousInstant = Date.now()
  let canceled = 0
  let requestId = requestAnimationFrame(function handle() {
    if (canceled) {
      return
    }
    callback()
    callbackCount++
    requestId = requestAnimationFrame(handle)
  })
  let intervalId = setInterval(() => {
    let now = Date.now()
    fpsCallback(((callbackCount * 1000) / (now - previousInstant)) | 0)
    callbackCount = 0
    previousInstant = now
  }, 512)
  return () => {
    canceled = 1
    cancelAnimationFrame(requestId)
    clearInterval(intervalId)
  }
}

export const defaultOptions = {
  cellSize: 3,
  worldWidth: 128,
  worldHeight: 128,
}
