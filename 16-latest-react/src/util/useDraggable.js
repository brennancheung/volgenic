import { useCallback, useContext, useRef, useState } from 'react'
import { CanvasContext } from '../canvas/Canvas'

// @param x (Number) The starting x coordinate
// @param y (Number) The starting y coordinate

const useDraggable = ({ x, y }) => {
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

  // `useCallback` is needed because `removeEventListener`` requires the handler
  // to be the same as `addEventListener`.  Without `useCallback` React will
  // create a new handler each render.
  const handleParentMouseMove = useCallback(e => {
    setDelta({
      x: e.clientX - startDragPos.current.x,
      y: e.clientY - startDragPos.current.y,
    })
  }, [])

  const handleMouseDown = useCallback(e => {
    setDragging(true)
    startDragPos.current = { x: e.clientX, y: e.clientY }
    canvasRef.current.addEventListener('mousemove', handleParentMouseMove)
  }, [canvasRef, handleParentMouseMove])

  const handleMouseUp = useCallback(e => {
    setDragging(false)
    setOriginalCoord({ x: xPos, y: yPos })
    startDragPos.current = { x: 0, y: 0 }
    setDelta({ x: 0, y: 0 })
    canvasRef.current.removeEventListener('mousemove', handleParentMouseMove)
  }, [canvasRef, handleParentMouseMove, xPos, yPos])

  const svgProps = {
    style: { userSelect: 'none' },
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    transform: `translate(${xPos}, ${yPos})`,
  }

  return { xPos, yPos, dragging, svgProps }
}

export default useDraggable
