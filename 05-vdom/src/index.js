import app, { render } from './app'
import createScope from './scope'

let scope
const context = {
  get: (obj, prop) => {
  },

  set: (obj, prop, value) => {
    render(scope)
  }
}

scope = createScope(context, { i: 0 })

setInterval(
  () => { scope.i += 1 },
  1000
)

const body = document.querySelector('body')
body.innerHTML = ''
const appDiv = document.createElement('div')
appDiv.setAttribute('id', 'app')
body.appendChild(appDiv)
app(appDiv, scope)
