/* eslint-disable no-eval, no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import uuid from 'uuid'
import createZone from './zone'

import NewGame from './screens/NewGame'

const JSONView = ({ json }) => <pre>{JSON.stringify(json, null, 4)}</pre>
const log = (...args) => console.log(...args)

const Main = (scope) => {
  const componentDidMount = () => {
    console.log('Main mounted')
  }

  const { screen } = scope.state

  return (
    <div hook-create={componentDidMount}>
      {screen === 'NewGame' && <NewGame scope={scope} />}
      <pre>{JSON.stringify(scope.state, null, 4)}</pre>
    </div>
  )
}

export default Main
