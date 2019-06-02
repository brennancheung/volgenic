/* eslint-disable no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import uuid from 'uuid'
import { addEntity } from './entities/entities'

const JSONView = ({ json }) => <pre>{JSON.stringify(json, null, 4)}</pre>
const log = (...args) => console.log(...args)

const Main = entities => {
  const componentDidMount = () => {
    console.log('Main mounted')
    addEntity({ tag: 'circle', cx: 100, cy: 100, r: 50, fill: 'red' })
  }

  return (
    <div hook-create={componentDidMount}>
      <JSONView json={entities} />
    </div>
  )
}

export default Main
