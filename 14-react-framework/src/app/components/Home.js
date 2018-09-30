import React from 'react'
import Button from '@material-ui/core/Button'
import { withAppContext } from 'app/AppContext'

const Home = ({ context, mutate }) => {
  const handleClick = () => mutate(draft => { draft.count++ })
  return (
    <div>
      <h1>Home</h1>
      <div>Count: {context.count}</div>
      <Button variant="raised" onClick={handleClick}>Increment</Button>
      <pre>{JSON.stringify(context, null, 4)}</pre>
    </div>
  )
}

export default withAppContext(Home)
