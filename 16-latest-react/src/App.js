import React, { useState } from 'react'
import ComponentUsingAppContext from './ComponentUsingAppContext'
import './App.css'

export const AppContext = React.createContext()

function App () {
  const [context, setContext] = useState({ counter: 555 })
  return (
    <div className="App">
      <AppContext.Provider value={{ ...context, setContext }}>
        <ComponentUsingAppContext />
      </AppContext.Provider>
    </div>
  )
}

export default App
