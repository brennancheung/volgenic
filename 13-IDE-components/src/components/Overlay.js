import Snabbdom from 'snabbdom-pragma'
import State from '../State'

const { state } = State

const OverlayType = ({ type, selected }) => {
  const style = {
    position: 'absolute',
    color: '#f82',
    top: '-34px',
    left: '-2px',
    padding: '8px',
    'text-transform': 'uppercase',
    'font-size': '14px',
  }

  if (selected) {
    style.color = '#fff'
    style['background-color'] = '#f82'
  }

  return (
    <div style={style}>{type}</div>
  )
}

const OverlayHover = ({ type, selected }) => {
  const style = {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    width: 'calc(100%)',
    height: 'calc(100%)',
    border: '2px dashed #f82',
  }

  if (selected) {
    style.border = '2px solid #f82'
  }

  return (
    <div style={style}>
      <OverlayType type={type} selected={selected} />
    </div>
  )
}

const Overlay = (data, children) => {
  const handlers = {
    mouseover () {
      State.update(() => { data.hovered = true })
    },

    mouseleave () {
      State.update(() => { data.hovered = false })
    },

    click (e) {
      window.dispatchEvent(new CustomEvent('overlay-deselect', {}))
      State.update(() => {
        data.selected = true
        state.selectedComponent = data
      })
      e.stopPropagation()
    },
  }

  const deselect = () => {
    State.update(() => { data.selected = false })
  }

  const hooks = {
    create () {
      data.hovered = false
      data.selected = false
      data.deselectListener = window.addEventListener('overlay-deselect', deselect)
    },

    remove () {
      window.removeEventListener(data.deselectListener)
    }
  }

  const style = {
    position: 'relative',
    'background-color': '#ccc',
    width: '200px',
    height: '100px',
  }

  const showOverlay = data.hovered || data.selected

  return (
    <div style={style} hook={hooks} on={handlers}>
      {children}
      {showOverlay && <OverlayHover type={data.type} selected={data.selected} />}
    </div>
  )
}

export default Overlay
