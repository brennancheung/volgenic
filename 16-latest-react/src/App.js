import React, { useState } from 'react'
import Canvas from './canvas/Canvas'
import './App.css'

export const AppContext = React.createContext()

function App () {
  const [context, setContext] = useState({ counter: 555 })
  return (
    <div className="App">
      <AppContext.Provider value={{ ...context, setContext }}>
        <Canvas />
      </AppContext.Provider>
    </div>
  )
}

export default App
