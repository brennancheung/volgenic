import React, { useContext } from 'react'
import useInterval from './util/useInterval'
import { AppContext } from './App'

const ComponentUsingAppContext = () => {
  const context = useContext(AppContext)

  useInterval(
    () => { context.setContext({ counter: context.counter + 1 }) },
    1000
  )

  return (
    <pre>{JSON.stringify(context, null, 4)}</pre>
  )
}

export default ComponentUsingAppContext
