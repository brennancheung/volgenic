import Snabbdom from 'snabbdom-pragma'
import GridCell from '../components/GridCell'
import CommandPalette from '../components/CommandPalette'
// import { rand } from '../fp'

const Stats = ({ scope }) => {
  const { state } = scope
  const stats = {
    screen: state.screen,
    deposits: state.deposits,
    buildings: state.buildings,
    inventory: state.inventory,
    round: state.round,
  }

  return (
    <div style={{ margin: '0 1em' }}>
      <h3>STATS TODO</h3>
      <pre>{JSON.stringify(stats, null, 4)}</pre>
    </div>
  )
}

const Grid = ({ scope }) => {
  const { state } = scope
  const { grid } = state
  return (
    <div>
      <h3>GAME GRID</h3>
      <table>
        {grid.map(row =>
          <tr>
            {row.map(col =>
              <td><GridCell cell={col} /></td>
            )}
          </tr>
        )}
      </table>
    </div>
  )
}

const styles = {
  display: 'flex',
}

const MainGame = ({ scope }) => {
  return (
    <div>
      <h1>Main Game</h1>
      <div style={styles}>
        <CommandPalette scope={scope} />
        <Grid scope={scope} />
        <Stats scope={scope} />
      </div>
    </div>
  )
}

export default MainGame
