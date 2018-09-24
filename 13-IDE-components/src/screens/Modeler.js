import Snabbdom from 'snabbdom-pragma'
import State from '../State'
import Overlay from '../components/Overlay'
import PropertyInspector from '../components/PropertyInspector'
import ComponentSwitch from '../components/ComponentSwitch'

const { state } = State

const Modeler = () => {
  const containerStyle = {
    margin: '50px',
    display: 'flex',
    'justify-content': 'space-between',
  }

  const canvasStyle = {
  }

  const componentStyle = {
    'margin-bottom': '50px',
  }
  return (
    <div>
      <h1>Modeler</h1>
      <div style={containerStyle}>
        <div style={canvasStyle}>
          <h2>Canvas</h2>
          <br />
          {state.componentData.map(data =>
            <div style={componentStyle}>
              <Overlay {...data}>
                <ComponentSwitch data={data} />
              </Overlay>
            </div>
          )}
        </div>
        <PropertyInspector component={state.selectedComponent} />
      </div>
    </div>
  )
}

export default Modeler
