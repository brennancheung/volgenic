import React, { useRef } from 'react'
import DragDropManager from './DragDropManager'
import PartsBin from '../parts/PartsBin'
import Transistor from '../parts/Transistor'

export const CanvasContext = React.createContext()

const Canvas = () => {
  const canvasRef = useRef()
  return (
    <div className="canvas">
      <CanvasContext.Provider value={canvasRef}>
        <DragDropManager>
          <svg
            ref={canvasRef}
            width="1000"
            height="1000"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <PartsBin />
            <Transistor />
          </svg>
        </DragDropManager>
      </CanvasContext.Provider>
    </div>
  )
}

export default Canvas
