import xs from 'xstream'
import { run } from '@cycle/run'
import { h1, makeDOMDriver } from '@cycle/dom'

const main = () => {
  const sinks = {
    DOM: xs.periodic(1000).map(i => h1(`${i} seconds elapsed`))
  }
  return sinks
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

const app = () => {
  const element = document.createElement('div')
  element.setAttribute('id', 'app')
  element.innerHTML = ''
  document.body.appendChild(element)
  run(main, drivers)
}

export default app
