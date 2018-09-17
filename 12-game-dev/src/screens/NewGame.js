import Snabbdom from 'snabbdom-pragma'
import { rand, arrFill } from '../fp'

const overlapping = (a, b) => a.x === b.x && a.y === b.y
const goodPlacement = (candidate, existings) => existings.every(existing => !overlapping(candidate, existing))

const gridWidth = 10
const gridHeight = 10

function randomizeDeposits (settings = {}) {
  // TODO: Vary the amount and richness of deposits based on settings
  const numDeposits = 3
  const depositSize = 1
  const richness = 300

  const placeDeposit = () => ({
    size: depositSize,
    x: rand(settings.gridWidth),
    y: rand(settings.gridHeight),
    remaining: richness,
  })

  let deposits = []

  for (let i = 0; i <= numDeposits;) {
    const potentialPlacement = placeDeposit()
    // If it's not overlapping add it
    if (goodPlacement(potentialPlacement, deposits)) {
      deposits.push(potentialPlacement)
      i++
    }
  }

  return deposits
}

const placeDeposits = (deposits, grid) => {
  deposits.forEach(d => {
    grid[d.y][d.x].deposits = {
      size: d.size,
      remaining: d.remaining,
    }
  })
  return deposits
}

const initGrid = () => arrFill(gridHeight).map(x => arrFill(gridWidth).map(_ => ({}))) // eslint-disable-line no-unused-vars

const NewGame = ({ scope }) => {
  const handleNewGame = () => {
    console.log('Initialize a bunch of stuff')
    const { state } = scope

    const grid = initGrid()

    scope.state = {
      ...scope.state,
      settings: {
        ...state.settings,
        gridWidth,
        gridHeight,
      },
      deposits: [],
      buildings: [],
      inventory: {
        ore: 0,
        metal: 0,
      },
      round: 0,
      screen: 'Playing',
      grid,
    }

    console.log('Randomize deposits')
    scope.state.deposits = randomizeDeposits(scope.state.settings)

    placeDeposits(scope.state.deposits, grid)

    console.log('Initialization complete!')
  }

  const componentDidMount = () => {
    handleNewGame()
  }

  return (
    <div hook-create={componentDidMount}>
      <h1>My Game</h1>
      <br />
      <br />
      <button on-click={handleNewGame}>
        <h2>Start New Game</h2>
      </button>
    </div>
  )
}

export default NewGame
