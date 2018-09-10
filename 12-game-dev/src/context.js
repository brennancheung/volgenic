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
  onChange (fn) {
    context.onChange = fn
  },

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
    if (scope.cache[prop]) {
      return scope.cache[prop]
    }
    setTimeout(
      () => {
        scope.cache[prop] = 5
        if (context.onChange) { context.onChange() }
      },
      1000
    )
    return initialValue !== undefined ? initialValue : null
  },

  setServer (scope, prop, value) {
    setTimeout(
      () => {
        scope.cache[prop] = value
        if (context.onChange) { context.onChange() }
      },
      1000
    )
  },

  getServerPromise (scope, prop) {
    return new Promise((resolve, reject) => {
      if (scope.cache[prop]) {
        return resolve(scope.cache[prop])
      }
      setTimeout(
        () => {
          scope.cache[prop] = 22
          if (context.onChange) { context.onChange() }
          return resolve(scope.cache[prop])
        },
        1000
      )
    })
  },

  setServerPromise (scope, prop, value) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          scope.cache[prop] = value
          if (context.onChange) { context.onChange() }
          resolve(value)
        },
        1000
      )
    })
  }
}

export default Context
