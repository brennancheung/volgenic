import Snabbdom from 'snabbdom-pragma'
import { rand } from '../fp'

const overlapping = (a, b) => a.x === b.x && a.y === b.y
const goodPlacement = (candidate, existings) => existings.every(existing => !overlapping(candidate, existing))

function randomizeDeposits (settings) {
  // TODO: Vary the amount and richness of deposits based on settings
  const numDeposits = 3
  const depositSize = 1
  const gridWidth = 10
  const gridHeight = 10
  const richness = 300

  const placeDeposit = () => ({
    size: depositSize,
    x: rand(gridWidth),
    y: rand(gridHeight),
    remaining: richness,
  })

  let deposits = []


  for (let i = 0; i <= numDeposits; ) {
    const potentialPlacement = placeDeposit()
    // If it's not overlapping add it
    if (goodPlacement(potentialPlacement, deposits)) {
      deposits.push(potentialPlacement)
      i++
    }
  }
  return deposits
}

const NewGame = ({ scope }) => {
  const handleNewGame = () => {

    console.log('Initialize a bunch of stuff')
    const { state } = scope
    scope.state = {
      ...state,
      deposits: [],
      buildings: [],
      inventory: {
        ore: 0,
        metal: 0,
      },
      round: 0
    }

    console.log('Randomize deposits')
    scope.state.deposits = randomizeDeposits(state.settings)

    console.log('Initialization complete!')
  }

  return (
    <div>
      <h1>My Game</h1>
      <br />
      <br />
      <button on={{ click: handleNewGame }}><h2>Start New Game</h2></button>
    </div>
  )
}

export default NewGame
