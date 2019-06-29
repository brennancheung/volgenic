import React from 'react'
import PartsBin from './parts/PartsBin'
import Canvas from './canvas/Canvas'

const Workspace = () => {
  return (
    <div className="workspace">
      <PartsBin />
      <Canvas />
    </div>
  )
}

export default Workspace
