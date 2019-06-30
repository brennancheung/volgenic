import React from 'react'
import PropTypes from 'prop-types'
import useDraggable from '../util/useDraggable'

// <img src="/images/parts/transistor.png" alt="" width="100" height="100" />
//
const Transistor = ({ x = 50, y = 50, r = 10, stroke = 'black' }) => {
  const { xPos, yPos, dragging, svgProps } = useDraggable({ x, y })
  const transform = `translate(${xPos}, ${yPos})`
  const fill = dragging ? 'red' : 'green'

  return (
    <svg {...svgProps}>
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