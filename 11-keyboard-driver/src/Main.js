/* eslint-disable no-eval, no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import uuid from 'uuid'
import createKeyboard from './keyboard'

const keyboard = createKeyboard()

const JSONView = ({ json }) => <pre>{JSON.stringify(json, null, 4)}</pre>
const log = (...args) => console.log(...args)

const simplifyEvent = (type, e) => ({ type, key: e.key, keyCode: e.keyCode, target: e.target })

const handleKeydown = e => {
  e.stopPropagation()
  if (e.repeat) { return }
  return keyboard.process(simplifyEvent('down', e))
  // e.preventDefault()
  // e.stopPropagation()
  // const simple = simplifyEvent('down', e)
  // keyboardDriver(simple)
}

const handleKeyup = e => {
  e.stopPropagation()
  return keyboard.process(simplifyEvent('up', e))
  // e.preventDefault()
  // e.stopPropagation()
  // const simple = simplifyEvent('up', e)
  // keyboardDriver(simple)
}

const handleKeypress = e => {
  e.stopPropagation()
  e.preventDefault()
}

function keyboardDriver (e) {
  log({...e})
}

const handlerStack = () => {
  let subscribers = []
  return {
    subscribe (handler) {
      subscribers.push(handler)
      return handler
    },

    process (event) {
      const fns = subscribers.reverse()
      let propagate = true
      event.stopPropagation = () => { propagate = false }
      for (let fn of fns) {
        fn(event)
        if (!propagate) { break }
      }
    }
  }
}

window.addEventListener('keydown', handleKeydown, true)
window.addEventListener('keyup', handleKeyup, true)
window.addEventListener('keypress', handleKeypress, true)

const Main = scope => {
  return (
    <div>
      <h1>Keyboard driver</h1>
      <input type="text" />
    </div>
  )
}

export default Main
