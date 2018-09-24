import Snabbdom from 'snabbdom-pragma'
import State from '../State'

const OverlayType = ({ type }) => {
  const style = {
    position: 'absolute',
    color: '#f82',
    top: '-30px',
    left: '-1px',
    padding: '0.5em',
    'text-transform': 'uppercase',
    'font-size': '16px',
  }
  return (
    <div style={style}>{type}</div>
  )
}

const OverlayHover = ({ type }) => {
  const style = {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    width: 'calc(100%)',
    height: 'calc(100%)',
    border: '2px dashed #f82',
  }

  return (
    <div style={style}>
      <OverlayType type={type} />
    </div>
  )
}

const Overlay = data => {
  const componentDidMount = () => {
    data.hovered = false
  }

  const handleMouseOver = () => State.update(() => { data.hovered = true })
  const handleMouseLeave = () => State.update(() => { data.hovered = false })

  const handlers = {
    mouseover: handleMouseOver,
    mouseleave: handleMouseLeave,
  }

  const style = {
    position: 'relative',
    'background-color': '#ccc',
    width: '500px',
    height: '300px',
  }
  return (
    <div style={style} hook-create={componentDidMount} on={handlers}>
      {data.contents}
      {data.hovered && <OverlayHover type={data.type} />}
    </div>
  )
}

export default Overlay
