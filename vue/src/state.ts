import { ref, shallowRef, watch } from 'vue'
import { defaultNextCellStateSelector, init, tick } from '/common/core'
import { animate, defaultOptions } from '/common/util'

export const cellSize = ref(defaultOptions.cellSize)
export const worldWidth = ref(defaultOptions.worldWidth)
export const worldHeight = ref(defaultOptions.worldHeight)
export const cells = shallowRef(init(worldWidth.value, worldHeight.value))
export const running = ref(false)
export const fps = ref(0)

let cancel: (() => void) | undefined

watch(running, running => {
  if (running) {
    cancel = animate(
      () => (cells.value = tick(cells.value, defaultNextCellStateSelector)),
      value => (fps.value = value),
    )
  } else {
    cancel?.()
    cancel = undefined
  }
})
