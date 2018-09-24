/* eslint-disable no-eval, no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import uuid from 'uuid'

import Modeler from './screens/Modeler'

const JSONView = ({ json }) => <pre>{JSON.stringify(json, null, 4)}</pre>
const log = (...args) => console.log(...args)

const style = {
  'font-family': '"Roboto", "sans-serif"',
  'box-sizing': 'border-box',
}
const Main = (scope) => {
  const componentDidMount = () => {
    console.log('Main mounted')
  }

  const { screen } = scope.state

  return (
    <div style={style} hook-create={componentDidMount}>
      {screen === 'Modeler' && <Modeler scope={scope} />}
    </div>
  )
}

export default Main
