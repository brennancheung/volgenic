const createScope = (context, initialValue={}) => {
  const scopeHandler = {
    get: (obj, prop) => {
      context.get(obj, prop)
      return obj[prop]
    },

    set: (obj, prop, value) => {
      obj[prop] = value
      context.set(obj, prop, value)
      return true
    }
  }

  const proxy = new Proxy(initialValue, scopeHandler)
  return proxy
}

export default createScope
