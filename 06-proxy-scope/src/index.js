import app, { render } from './app'
import createScope from './scope'
import context from './context'

/*
let scope
const context = {
  get: (obj, prop) => {
  },

  set: (obj, prop, value) => {
    render(scope)
  }
}

scope = createScope(context, { i: 0 })

*/

const scope = createScope({
  i: {
    local: true,
    initialValue: 1
  }
})

context.onLocalChange(() => {
  render(scope)
})

setInterval(
  () => { scope.i += 1 },
  100
)

const body = document.querySelector('body')
body.innerHTML = ''
const appDiv = document.createElement('div')
appDiv.setAttribute('id', 'app')
body.appendChild(appDiv)
app(appDiv, scope)
