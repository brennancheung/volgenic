import app, { render } from './app'
import createScope from './scope'
import context from './context'

const scope = createScope({
  i: {
    local: true,
    initialValue: 1
  },
  remoteI: {
    server: true,
    mount: '/data/i',
    initialValue: 1
  }
})

context.onChange(() => {
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
