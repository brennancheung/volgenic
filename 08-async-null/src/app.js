let Counter = require('./Counter').default

var snabbdom = require('snabbdom')
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
])

let vnode

export async function render (data) {
  let newVnode = await Counter(data)
  patch(vnode, newVnode)
  vnode = newVnode
}

async function app (container, data) {
  vnode = await Counter(data)
  patch(container, vnode)
}

if (module.hot) {
  module.hot.accept('./Counter.js', () => {
    Counter = require('./Counter.js').default
  })
}
export default app
