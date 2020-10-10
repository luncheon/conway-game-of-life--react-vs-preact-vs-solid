class BitTable {
  private readonly buffer: Uint32Array

  constructor(public X: number, public Y: number) {
    this.buffer = new Uint32Array(Math.ceil((X * Y) / 32))
  }

  get(x: number, y: number): 1 | 0 {
    const { X, Y } = this
    x = x % X
    x < 0 && (x = x + X)
    y = y % Y
    y < 0 && (y = y + Y)
    const index = y * X + x
    return this.buffer[(index / 32) | 0] & (1 << index % 32) ? 1 : 0
  }

  set(x: number, y: number, value: unknown) {
    const index = y * this.X + x
    if (value) {
      this.buffer[(index / 32) | 0] |= 1 << index % 32
    } else {
      this.buffer[(index / 32) | 0] &= ~(1 << index % 32)
    }
  }
}

const rand = (() => {
  let x = (Math.random() * 2147483647) | 0
  return () => {
    x ^= x << 13
    x ^= x >> 17
    x ^= x << 5
    return x
  }
})()

export const init = (X: number, Y: number, aliveRatio = 0.25) => {
  const bits = new BitTable(X, Y)
  const aliveThreshold = (100 * aliveRatio) | 0
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if ((rand() % 50) + 50 < aliveThreshold) {
        bits.set(x, y, 1)
      }
    }
  }
  return bits
}

export const empty = (X: number, Y: number) => new BitTable(X, Y)

export type NextCellStateSelector = (current: BitTable, x: number, y: number) => unknown

export const createNextCellStateSelector = (
  adjacentSurvivorsCountsToSurvive: readonly number[],
  adjacentSurvivorsCountsToBirth: readonly number[],
): NextCellStateSelector => (current, x, y) => {
  const adjacentSurvivorsCount =
    current.get(x - 1, y - 1) +
    current.get(x, y - 1) +
    current.get(x + 1, y - 1) +
    current.get(x - 1, y) +
    current.get(x + 1, y) +
    current.get(x - 1, y + 1) +
    current.get(x, y + 1) +
    current.get(x + 1, y + 1)
  return current.get(x, y)
    ? adjacentSurvivorsCountsToSurvive.includes(adjacentSurvivorsCount)
    : adjacentSurvivorsCountsToBirth.includes(adjacentSurvivorsCount)
}

export const defaultNextCellStateSelector = createNextCellStateSelector([2, 3], [3])

export const tick = (current: BitTable, nextCellStateSelector = defaultNextCellStateSelector) => {
  const { X, Y } = current
  const next = new BitTable(X, Y)
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if (nextCellStateSelector(current, x, y)) {
        next.set(x, y, 1)
      }
    }
  }
  return next
}
