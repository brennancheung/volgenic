import { useEffect, useRef } from 'react'
import uuid from 'uuid'

const useDropTarget = ({ x, y, width, height }) => {
  const ref = useRef()

  useEffect(() => {
    const id = uuid.v4()
    console.log('register drop target', { id, x, y, width, height })
    return () => {
      console.log('remove drop target', { id })
    }
  }, [x, y, width, height])
  return { ref, x, y, width, height }
}

export default useDropTarget
