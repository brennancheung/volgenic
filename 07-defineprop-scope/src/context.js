/* eslint-disable no-unused-vars */
const context = {
  /*
   * Global variables will be stored here.
   */
  global: {},

  /*
   * Each time local scope changes, this handler will be
   * called.  This is useful for triggering a render.
   */
  onChange: null
}

const Context = {
  getLocal (scope, prop, initialValue) {
    if (scope.data[prop] === undefined) {
      scope.data[prop] = initialValue
    }
    return scope.data[prop]
  },

  setLocal (scope, prop, value) {
    scope.data[prop] = value
    if (context.onChange) { context.onChange() }
    return value
  },

  getServer (scope, prop, initialValue) {
    return new Promise((resolve, reject) => {
      if (scope.cache[prop]) {
        return resolve(scope.cache[prop])
      }
      setTimeout(
        () => {
          scope.cache[prop] = 5
          resolve(5)
        },
        1000
      )
    })
  },

  setServer (scope, prop, value) {
    console.log('setServer', prop, value)
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve(value)
          scope.cache[prop] = value
          if (context.onChange) { context.onChange() }
        },
        1000
      )
    })
  },

  onChange (fn) {
    context.onChange = fn
  }
}

export default Context
