import createScope from './scope'
import context from './context'

let Main = require('./Main').default

var snabbdom = require('snabbdom')
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
])

let vnode

const scope = createScope({
  generatedCode: {
    local: true,
    initialValue: ''
  },
  exports: {
    local: true,
    initialValue: {}
  },
})

context.onChange(() => {
  render(scope)
})

setInterval(
  () => { scope.i += 1 },
  100
)

export async function render (data) {
  let newVnode = await Main(data)
  patch(vnode, newVnode)
  vnode = newVnode
}

async function app (container, data = scope) {
  vnode = await Main(data)
  patch(container, vnode)
}

if (module.hot) {
  module.hot.accept('./Main.js', () => {
    Main = require('./Main.js').default
    render(scope)
  })
}
export default app
