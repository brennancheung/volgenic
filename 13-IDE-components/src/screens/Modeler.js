import Snabbdom from 'snabbdom-pragma'
import State from '../State'
import Overlay from '../components/Overlay'

const Modeler = () => {
  const style = {
    margin: '50px',
  }

  return (
    <div>
      <h1>Modeler</h1>
      <div style={style}>
        <Overlay {...State.state.componentData[0]} />
      </div>
    </div>
  )
}

export default Modeler
