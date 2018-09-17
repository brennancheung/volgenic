import context from './context'
import scope from './Game'

let Main = require('./Main').default

var snabbdom = require('snabbdom')
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
])

let vnode

context.onChange(() => {
  // Don't do anything.  We will re-render on `requestAnimationFrame`
  // render(scope)
})

function repaint () {
  render(scope)
  setTimeout(repaint, 200)
  // Don't kill my CPU while I'm developing
  // requestAnimationFrame(repaint)
}

// Need to wait for VDOM to be set up
setImmediate(repaint)

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
