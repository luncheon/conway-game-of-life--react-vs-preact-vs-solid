class BitTable {
  private readonly buffer: Uint32Array

  constructor(public X: number, public Y: number) {
    this.buffer = new Uint32Array(Math.ceil((X * Y) / 32))
  }

  get(x: number, y: number): 1 | 0 {
    const { X, Y, buffer } = this
    const _x = x < 0 ? (x % X) + X : x % X
    const _y = y < 0 ? (y % Y) + Y : y % Y
    const index = _y * X + _x
    return buffer[index >> 5] & (1 << (index & 31)) ? 1 : 0 // (*1)
  }

  set(x: number, y: number, value: unknown) {
    const index = y * this.X + x
    if (value) {
      this.buffer[index >> 5] |= 1 << (index & 31) // (*1)
    } else {
      this.buffer[index >> 5] &= ~(1 << (index & 31)) // (*1)
    }
  }

  // (*1)
  //  n >> 5 === (n / 32) | 0
  //  n & 31 === (n % 32) | 0
}

export const init = (X: number, Y: number, aliveRatio = 0.25) => {
  const bits = new BitTable(X, Y)
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if (Math.random() < aliveRatio) {
        bits.set(x, y, 1)
      }
    }
  }
  return bits
}

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
