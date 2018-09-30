import Snabbdom from 'snabbdom-pragma'
import State from '../State'
import PropertyInspector from '../components/PropertyInspector'
import ComponentPalette from '../components/ComponentPalette'
import Canvas from '../components/Canvas'

const { state } = State

const Modeler = () => {
  const containerStyle = {
    margin: '50px',
    display: 'flex',
    'justify-content': 'space-between',
  }

  return (
    <div>
      <h1>Modeler</h1>
      <div style={containerStyle}>
        <ComponentPalette />
        <Canvas />
        <PropertyInspector component={state.selectedComponent} />
      </div>
    </div>
  )
}

export default Modeler
