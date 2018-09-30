import Snabbdom from 'snabbdom-pragma'
import ComponentSwitch from './ComponentSwitch'
import Overlay from './Overlay'
import State from '../State'

const { state } = State

const Canvas = () => {
  const containerStyle = {}

  const canvasStyle = {
    border: '1px dashed #888',
  }

  const componentStyle = {
    'margin-bottom': '50px',
  }

  const handlers = {
    click () {
      const event = new CustomEvent('overlay-deselect', {})
      window.dispatchEvent(event)
    },
  }

  return (
    <div style={containerStyle} on={handlers}>
      <h2>Canvas</h2>
      <br />
      <div style={canvasStyle}>
        {state.componentData.map(data =>
          <div style={componentStyle}>
            <Overlay {...data}>
              <ComponentSwitch data={data} />
            </Overlay>
          </div>
        )}
      </div>
    </div>
  )
}

export default Canvas
