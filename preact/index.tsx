import { h, render, Fragment, ComponentChildren } from 'preact'
import { createSharedState } from 'preact-shared-state-hook'
import { useEffect, useRef, useState } from 'preact/hooks'
import { init, tick } from '../common/core'
import { animate, rangeMap, defaultOptions } from '../common/util'

declare module 'preact/src/jsx' {
  namespace JSXInternal {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      defaultValue?: HTMLAttributes['value']
    }
  }
}

const [useCellSize, setCellSize] = createSharedState(defaultOptions.cellSize)
const [useWorldWidth, setWorldWidth] = createSharedState(defaultOptions.worldWidth)
const [useWorldHeight, setWorldHeight] = createSharedState(defaultOptions.worldHeight)
const [useCells, setCells] = createSharedState(init(defaultOptions.worldWidth, defaultOptions.worldHeight))
const [useRunning, setRunning] = createSharedState(false)
const [useFps, setFps] = createSharedState(0)

const Cell = ({ x, y }: { x: number; y: number }) => {
  const cellSize = useCellSize()
  const cells = useCells()
  return <td className={cells.get(x, y) ? 'cell cell-alive' : 'cell'} style={{ width: cellSize, height: cellSize }} />
}

const Row = ({ y }: { y: number }) => {
  const worldWidth = useWorldWidth()
  return (
    <tr>
      {rangeMap(worldWidth, x => (
        <Cell key={x} x={x} y={y} />
      ))}
    </tr>
  )
}

const World = () => {
  const worldHeight = useWorldHeight()
  return (
    <table style={{ tableLayout: 'fixed' }}>
      {rangeMap(worldHeight, y => (
        <Row key={y} y={y} />
      ))}
    </table>
  )
}

const Button = ({ onClick, children }: { onClick: () => void; children: ComponentChildren }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

const Controls = () => {
  const cellSize = useCellSize()
  const worldWidth = useWorldWidth()
  const worldHeight = useWorldHeight()
  const running = useRunning()
  const fps = useFps()
  return (
    <aside>
      <table>
        <tbody>
          <tr>
            <td>Cell Size:</td>
            <td>
              <input type="number" min={0} value={cellSize} onChange={e => setCellSize(e.currentTarget.valueAsNumber)} />
            </td>
          </tr>
          <tr>
            <td>World Width:</td>
            <td>
              <input type="number" min={0} value={worldWidth} onChange={e => setWorldWidth(e.currentTarget.valueAsNumber)} />
            </td>
          </tr>
          <tr>
            <td>World Height:</td>
            <td>
              <input type="number" min={0} value={worldHeight} onChange={e => setWorldHeight(e.currentTarget.valueAsNumber)} />
            </td>
          </tr>
        </tbody>
      </table>
      {running ? <Button onClick={() => setRunning(false)}>Stop</Button> : <Button onClick={() => setRunning(true)}>Start</Button>}
      <Button onClick={() => setCells(init(worldWidth, worldHeight))}>Randomize</Button>
      <div>{fps} fps</div>
    </aside>
  )
}

const Link = ({ href, children }: { href: string; children: ComponentChildren }) => (
  <a target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
)

const App = () => {
  const worldWidth = useWorldWidth()
  const worldHeight = useWorldHeight()
  const running = useRunning()
  const [cancel, setCancel] = useState<(() => void) | undefined>(undefined)
  const firstTime = useRef(true)

  useEffect(() => {
    if (running) {
      setCancel(() => animate(() => setCells(tick), setFps))
    } else {
      cancel?.()
      setCancel(undefined)
    }
  }, [running])

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false
    } else {
      setCells(init(worldWidth, worldHeight))
    }
  }, [worldWidth, worldHeight])

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}>
        <Link href="https://preactjs.com/">Preact</Link> + {}
        <Link href="https://github.com/luncheon/preact-shared-state-hook">preact-shared-state-hook</Link>
      </h1>
      <main>
        <World />
        <Controls />
      </main>
    </Fragment>
  )
}

render(<App />, document.body.appendChild(document.createElement('div')))
