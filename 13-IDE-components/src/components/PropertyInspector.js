import Snabbdom from 'snabbdom-pragma'
import State from '../State'

// const { state } = State

const PropertyEditor = ({ prop, component }) => {
  const handleChange = e => {
    State.update(() => { prop.value = e.target.value })
  }

  const inputStyle = {
    width: '100%',
    height: '20px',
  }

  return (
    <div>
      <h3>{prop.name}</h3>
      <input style={inputStyle} type="text" value={prop.value} on-input={handleChange} />
    </div>
  )
}
const PropertyInspector = ({ component }) => {
  const style = {
    width: '500px',
  }

  const typeStyle = {
    'text-transform': 'uppercase',
  }

  if (!component) { return null }

  const renderPropEditor = () => {
    return (
      <div>
        <div style={typeStyle}>{component.type}</div>
        {component.props.map(prop => <PropertyEditor prop={prop} component={component} />)}
      </div>
    )
  }

  return (
    <div style={style}>
      <h3>Property Inspector</h3>
      {component && renderPropEditor()}
    </div>
  )
}

export default PropertyInspector
