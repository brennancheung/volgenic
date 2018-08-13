import context from './context'

const createScope = (specs = {}) => {
  const scope = {}

  const scopeHandler = {
    get: (obj, prop) => {
      const spec = specs[prop]
      if (!spec) {
        throw new Error(`${prop} not defined in scope spec`)
      }
      if (spec.local) {
        const value = context.getLocal(obj, prop, spec.initialValue)
        return value
      }
    },

    set: (obj, prop, value) => {
      context.setLocal(obj, prop, value)
      return true
    }
  }

  const proxy = new Proxy(scope, scopeHandler)
  return proxy
}

export default createScope
