import React, { useEffect, useReducer, useRef } from 'react'
import { assoc } from 'ramda'

export const DragDropContext = React.createContext()

const reducer = (state, action) => {
  const { type, payload } = action
  const removeById = x => x.id !== payload
  switch (type) {
    case 'addTarget':
      return assoc('targets', [...state.targets, payload], state)
    case 'removeTarget':
      return assoc('targets', state.targets.filter(removeById), state)
    default:
      return state
  }
}

const initialState = { targets: [] }

const DragDropManager = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DragDropContext.Provider value={{ state, dispatch }}>
      {children}
    </DragDropContext.Provider>
  )
}

export default DragDropManager
