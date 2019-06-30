import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CanvasContext } from '../canvas/Canvas'

// <img src="/images/parts/transistor.png" alt="" width="100" height="100" />
//
const Transistor = ({ x = 50, y = 50, r = 10 }) => {
  const canvasRef = useContext(CanvasContext)
  const [dragging, setDragging] = useState(false)
  const [coord, setCoord] = useState({ x, y })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const xPos = coord.x + offset.x
  const yPos = coord.y + offset.y

  const transform = `translate(${xPos}, ${yPos})`

  const fill = dragging ? 'red' : 'green'
  const stroke = 'black'

  const handleMouseDown = e => {
    setDragging(true)
    setOrigin({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = e => {
    if (!dragging) { return }
    setOffset({
      x: e.clientX - origin.x,
      y: e.clientY - origin.y,
    })
  }

  const handleMouseUp = e => {
    setDragging(false)
    setCoord({ x: xPos, y: yPos })
    setOrigin({ x: 0, y: 0 })
    setOffset({ x: 0, y: 0 })
  }

  return (
    <svg style={{ userSelect: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      <circle transform={transform} cx="0" cy="0" r={r} fill={fill} stroke={stroke} />
    </svg>
  )
}

Transistor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
}

export default Transistor
