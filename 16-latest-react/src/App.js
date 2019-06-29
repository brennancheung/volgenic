import React, { useState } from 'react'
import Workspace from './Workspace'
import './App.css'

export const AppContext = React.createContext()

function App () {
  const [context, setContext] = useState({ counter: 555 })
  return (
    <div className="App">
      <AppContext.Provider value={{ ...context, setContext }}>
        <Workspace />
      </AppContext.Provider>
    </div>
  )
}

export default App
