import React from 'react'
import useDropTarget from '../util/useDropTarget'

const PartsBin = () => {
  const props = useDropTarget({
    x: 0,
    y: 0,
    width: 150,
    height: 1000,
  })
  return (
    <svg>
      <rect {...props} stroke="black" fill="#f0f0ff" />
    </svg>
  )
}

export default PartsBin
