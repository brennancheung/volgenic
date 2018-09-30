import Snabbdom from 'snabbdom-pragma'
import State from '../State'

// const { state } = State

const PropertyEditor = ({ prop, component }) => {
  const handleChange = e => {
    State.update(() => { prop.value = e.target.value })
  }

  const inputStyle = {
    width: '98%',
    height: '20px',
  }

  const style = {
    'background-color': '#ccc',
    padding: '10px',
  }
  return (
    <div style={style}>
      <div>{prop.name}</div>
      <input style={inputStyle} type="text" value={prop.value} on-input={handleChange} />
    </div>
  )
}
const PropertyInspector = ({ component }) => {
  const style = {
    width: '500px',
    'background-color': '#eee',
  }

  const typeStyle = {
    'text-transform': 'uppercase',
    'font-weight': 'bold',
  }

  const renderPropEditor = () => {
    return (
      <div>
        <div style={typeStyle}>{component.type}</div>
        <br />
        {component.props.map(prop => <PropertyEditor prop={prop} component={component} />)}
      </div>
    )
  }

  return (
    <div style={style}>
      <h2>Property Inspector</h2>
      {component && renderPropEditor()}
    </div>
  )
}

export default PropertyInspector
