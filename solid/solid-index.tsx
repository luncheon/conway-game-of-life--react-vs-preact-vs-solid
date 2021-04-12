import { createEffect, createSignal, JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { init, tick } from '../common/core'
import { animate, defaultOptions, rangeMap } from '../common/util'

const [cellSize, setCellSize] = createSignal(defaultOptions.cellSize)
const [worldWidth, setWorldWidth] = createSignal(defaultOptions.worldWidth)
const [worldHeight, setWorldHeight] = createSignal(defaultOptions.worldHeight)
const [cells, setCells] = createSignal(init(worldWidth(), worldHeight()))
const [running, setRunning] = createSignal(false)
const [fps, setFps] = createSignal(0)

const Cell = ({ x, y }: { x: number; y: number }) => (
  <td class={cells().get(x, y) ? 'cell cell-alive' : 'cell'} style={{ width: `${cellSize()}px`, height: `${cellSize()}px` }} />
)

const Row = ({ y }: { y: number }) => (
  <tr>
    {rangeMap(worldWidth(), x => (
      <Cell x={x} y={y} />
    ))}
  </tr>
)

const World = () => (
  <table style="table-layout: fixed">
    {rangeMap(worldHeight(), y => (
      <Row y={y} />
    ))}
  </table>
)

const Button = ({ onClick, children }: { onClick: () => void; children: JSX.Element }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

const Controls = () => (
  <aside>
    <table>
      <tbody>
        <tr>
          <td>Cell Size:</td>
          <td>
            <input type="number" min={0} value={cellSize()} onChange={e => setCellSize(e.currentTarget.valueAsNumber)} />
          </td>
        </tr>
        <tr>
          <td>World Width:</td>
          <td>
            <input type="number" min={0} value={worldWidth()} onChange={e => setWorldWidth(e.currentTarget.valueAsNumber)} />
          </td>
        </tr>
        <tr>
          <td>World Height:</td>
          <td>
            <input type="number" min={0} value={worldHeight()} onChange={e => setWorldHeight(e.currentTarget.valueAsNumber)} />
          </td>
        </tr>
      </tbody>
    </table>
    {running() ? <Button onClick={() => setRunning(false)}>Stop</Button> : <Button onClick={() => setRunning(true)}>Start</Button>}
    <Button onClick={() => setCells(init(worldWidth(), worldHeight()))}>Randomize</Button>
    <div>{fps()} fps</div>
  </aside>
)

const App = () => {
  createEffect(() => setCells(init(worldWidth(), worldHeight())))

  let cancel: (() => void) | undefined
  createEffect(() => {
    if (running()) {
      cancel = animate(() => setCells(tick(cells())), setFps)
    } else {
      cancel?.()
      cancel = undefined
    }
  })

  return (
    <>
      <h1 style="text-align: center">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ryansolid/solid">
          Solid
        </a>
      </h1>
      <main>
        <World />
        <Controls />
      </main>
    </>
  )
}

render(() => <App />, document.body.appendChild(document.createElement('div')))
