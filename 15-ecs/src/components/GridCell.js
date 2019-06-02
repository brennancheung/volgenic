import Snabbdom from 'snabbdom-pragma'
import Game from '../Game'

const calcStyle = data => {
  let bgColor = data.hovered ? '#ccc' : '#fff'
  if (data.validPlacement) {
    bgColor = '#0fc'
  }

  return {
    width: '130px',
    height: '130px',
    border: '1px solid #000',
    'backgroundColor': bgColor
  }
}

const Deposit = ({ deposit }) => (<div>D: {deposit.remaining}</div>)

const GridCell = ({ cell }) => {
  const componentDidMount = () => {
    cell.hovered = false
    cell.validPlacement = false
  }

  const hasDeposits = () => !!cell.deposits

  const handleMouseOver = () => {
    cell.hovered = true

    switch (Game.activeCommand) {
      // Ore Extractor
      case 'E':
        cell.validPlacement = hasDeposits()
        break
    }
  }

  const handleBlur = () => {
    cell.hovered = false
    cell.validPlacement = false
  }

  const style = calcStyle({
    hovered: cell.hovered,
    validPlacement: cell.validPlacement,
  })

  const handlers = {
    mouseover: handleMouseOver,
    mouseleave: handleBlur,
  }

  return (
    <div style={style} hook-create={componentDidMount} on={handlers}>
      {hasDeposits() && <Deposit deposit={cell.deposits} />}
      {JSON.stringify(cell.deposits, null, 4)}
    </div>
  )
}

export default GridCell
