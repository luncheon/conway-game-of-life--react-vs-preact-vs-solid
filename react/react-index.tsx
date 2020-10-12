import * as React from 'react'
import { render } from 'react-dom'
import { atom, RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { init, tick } from '../common/core'
import { animate, defaultOptions, rangeMap } from '../common/util'

const cellSizeState = atom({ key: 'cellSize', default: defaultOptions.cellSize })
const worldWidthState = atom({ key: 'worldWidth', default: defaultOptions.worldWidth })
const worldHeightState = atom({ key: 'worldHeight', default: defaultOptions.worldHeight })
const cellsState = atom({ key: 'cells', default: init(defaultOptions.worldWidth, defaultOptions.worldHeight) })
const runningState = atom({ key: 'running', default: false })
const fpsState = atom({ key: 'fps', default: 0 })

const Cell = React.memo(({ x, y }: { x: number; y: number }) => {
  const cellSize = useRecoilValue(cellSizeState)
  const cells = useRecoilValue(cellsState)
  return <td className={cells.get(x, y) ? 'cell cell-alive' : 'cell'} style={{ width: cellSize, height: cellSize }} />
})

const Row = React.memo(({ y }: { y: number }) => {
  const worldWidth = useRecoilValue(worldWidthState)
  return (
    <tr>
      {rangeMap(worldWidth, x => (
        <Cell key={x} x={x} y={y} />
      ))}
    </tr>
  )
})

const World = React.memo(() => {
  const worldHeight = useRecoilValue(worldHeightState)
  return (
    <table style={{ tableLayout: 'fixed' }}>
      {rangeMap(worldHeight, y => (
        <Row key={y} y={y} />
      ))}
    </table>
  )
})

const Button = React.memo(({ onClick, children }: { onClick: () => void; children: React.ReactChild | React.ReactChild[] }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
))

const Controls = React.memo(() => {
  const setCells = useSetRecoilState(cellsState)
  const [cellSize, setCellSize] = useRecoilState(cellSizeState)
  const [worldWidth, setWorldWidth] = useRecoilState(worldWidthState)
  const [worldHeight, setWorldHeight] = useRecoilState(worldHeightState)
  const [running, setRunning] = useRecoilState(runningState)
  const fps = useRecoilValue(fpsState)
  return (
    <aside>
      <table>
        <tbody>
          <tr>
            <td>Cell Size:</td>
            <td>
              <input type="number" min={0} value={cellSize} onChange={e => setCellSize(e.target.valueAsNumber)} />
            </td>
          </tr>
          <tr>
            <td>World Width:</td>
            <td>
              <input type="number" min={0} value={worldWidth} onChange={e => setWorldWidth(e.target.valueAsNumber)} />
            </td>
          </tr>
          <tr>
            <td>World Height:</td>
            <td>
              <input type="number" min={0} value={worldHeight} onChange={e => setWorldHeight(e.target.valueAsNumber)} />
            </td>
          </tr>
        </tbody>
      </table>
      {running ? <Button onClick={() => setRunning(false)}>Stop</Button> : <Button onClick={() => setRunning(true)}>Start</Button>}
      <Button onClick={() => setCells(init(worldWidth, worldHeight))}>Randomize</Button>
      <div>{fps} fps</div>
    </aside>
  )
})

const Link = React.memo(({ href, children }: { href: string; children: React.ReactChild | React.ReactChild[] }) => (
  <a target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
))

const App = React.memo(() => {
  const setFps = useSetRecoilState(fpsState)
  const setCells = useSetRecoilState(cellsState)
  const worldWidth = useRecoilValue(worldWidthState)
  const worldHeight = useRecoilValue(worldHeightState)
  const running = useRecoilValue(runningState)
  const [cancel, setCancel] = React.useState<(() => void) | undefined>(undefined)
  const firstTime = React.useRef(true)

  React.useEffect(() => {
    if (running) {
      setCancel(() => animate(() => setCells(tick), setFps))
    } else {
      cancel?.()
      setCancel(undefined)
    }
  }, [running])

  React.useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false
    } else {
      setCells(init(worldWidth, worldHeight))
    }
  }, [worldWidth, worldHeight])

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        <Link href="https://reactjs.org/">React</Link> + <Link href="https://recoiljs.org/">Recoil</Link>
      </h1>
      <main>
        <World />
        <Controls />
      </main>
    </>
  )
})

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.body.appendChild(document.createElement('div')),
)
