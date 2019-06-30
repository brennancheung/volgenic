import React, { useRef } from 'react'
import Transistor from '../parts/Transistor'

export const CanvasContext = React.createContext()

const Canvas = () => {
  const canvasRef = useRef()
  return (
    <div className="canvas">
      <h3>Canvas</h3>
      <CanvasContext.Provider value={canvasRef}>
        <svg
          ref={canvasRef}
          width="600"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <Transistor />
        </svg>
      </CanvasContext.Provider>
    </div>
  )
}

export default Canvas
