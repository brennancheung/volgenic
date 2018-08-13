const context = {
  /*
   * Global variables will be stored here.
   */
  global: {},

  /*
   * Each time local scope changes, this handler will be
   * called.  This is useful for triggering a render.
   */
  onLocalChange: null
}

const Context = {
  getLocal (scope, prop, initialValue) {
    if (scope[prop] === undefined) {
      scope[prop] = initialValue
    }
    return scope[prop]
  },

  setLocal (scope, prop, value) {
    scope[prop] = value
    if (context.onLocalChange) {
      context.onLocalChange()
    }
    return value
  },

  onLocalChange (fn) {
    context.onLocalChange = fn
  }
}

export default Context
