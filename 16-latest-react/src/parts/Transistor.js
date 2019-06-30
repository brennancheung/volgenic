import React, { useCallback, useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CanvasContext } from '../canvas/Canvas'

// <img src="/images/parts/transistor.png" alt="" width="100" height="100" />
//
const Transistor = ({ x = 50, y = 50, r = 10, stroke = 'black' }) => {
  // `mousemove` will not generate events if the user moves the mouse too fast
  // because the `mousemove` only gets sent when the mouse is still over the object.
  // To work around this issue, we `addEventListener` to the parent canvas.
  const canvasRef = useContext(CanvasContext)

  const [dragging, setDragging] = useState(false)

  // Original position independent of any dragging.  Updated when done dragging.
  const [originalCoord, setOriginalCoord] = useState({ x, y })

  // The distance the mouse has moved since `mousedown`.
  const [delta, setDelta] = useState({ x: 0, y: 0 })

  // Store startDragPos in a `ref` so handlers always have the latest value.
  const startDragPos = useRef({ x: 0, y: 0 })

  // The current object position is the original starting position + the distance
  // the mouse has moved since the start of the drag.
  const xPos = originalCoord.x + delta.x
  const yPos = originalCoord.y + delta.y
  const transform = `translate(${xPos}, ${yPos})`

  // `useCallback` is needed because `removeEventListener`` requires the handler
  // to be the same as `addEventListener`.  Without `useCallback` React will
  // create a new handler each render.
  const handleParentMouseMove = useCallback(e => {
    setDelta({
      x: e.clientX - startDragPos.current.x,
      y: e.clientY - startDragPos.current.y,
    })
  }, [])

  const handleMouseDown = e => {
    setDragging(true)
    startDragPos.current = { x: e.clientX, y: e.clientY }
    canvasRef.current.addEventListener('mousemove', handleParentMouseMove)
  }

  const handleMouseUp = e => {
    setDragging(false)
    setOriginalCoord({ x: xPos, y: yPos })
    startDragPos.current = { x: 0, y: 0 }
    setDelta({ x: 0, y: 0 })
    canvasRef.current.removeEventListener('mousemove', handleParentMouseMove)
  }

  const fill = dragging ? 'red' : 'green'

  return (
    <svg style={{ userSelect: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle transform={transform} cx="0" cy="0" r={r} fill={fill} stroke={stroke} />
    </svg>
  )
}

Transistor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  stroke: PropTypes.string,
}

export default Transistor
