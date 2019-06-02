import Snabbdom from 'snabbdom-pragma'

const tileSize = '130px'
const calcStyle = ({ selected }) => {
  return {
    display: 'flex',
    width: tileSize,
    height: tileSize,
    border: '1px solid #000',
    'text-align': 'center',
    'justify-content': 'center',
    'align-items': 'center',
    'font-size': '20px',
    'backgroundColor': selected ? '#ccf' : '#eef',
  }
}

const CommandTile = ({ scope, name, hotkey }) => {
  const style = calcStyle({
    selected: scope.activeCommand === hotkey,
  })
  const hotkeyStyle = {
    'font-weight': 'bolder',
  }
  return (
    <div style={style}>
      <div>
        <div>{name}</div>
        <div style={hotkeyStyle}>({hotkey})</div>
      </div>
    </div>
  )
}

const CommandPalette = ({ scope }) => {
  const componentDidMount = () => {
    window.addEventListener('keypress', e => {
      const command = e.key.toUpperCase()
      // const command = e.key.toUpperCase()
      scope.activeCommand = command
    })
  }

  const handleMouseOver = () => {}
  const handleMouseLeave = () => {}

  const handlers = {
    mouseover: handleMouseOver,
    mouseleave: handleMouseLeave,
  }

  const style = {
    display: 'grid',
    'grid-template-columns': `${tileSize} ${tileSize}`,
    width: '280px',
    'margin-right': '1em',
  }
  return (
    <div hook-create={componentDidMount} on={handlers}>
      <h3>COMMANDS</h3>
      <div style={style}>
        <CommandTile scope={scope} name="Ore Extractor" hotkey="E" />
        <CommandTile scope={scope} name="Smelter" hotkey="S" />
        <CommandTile scope={scope} name="Missle Turret" hotkey="T" />
        <CommandTile scope={scope} name="Solar Panel" hotkey="A" />
        <CommandTile scope={scope} name="Conduit" hotkey="C" />
        <CommandTile scope={scope} name="Factory" hotkey="F" />
        <CommandTile scope={scope} name="Research Lab" hotkey="R" />
        <CommandTile scope={scope} name="Battery" hotkey="B" />
      </div>
    </div>
  )
}

export default CommandPalette
