import context from './context'

const createScope = (specs = {}) => {
  const scope = {
    data: {},
    cache: {},
    set: (key, value) => context.setServer(scope, key, value),
  }

  Object.entries(specs).forEach(([key, spec]) => {
    if (spec.local) {
      Object.defineProperty(scope, key, {
        writeable: true,
        get: () => context.getLocal(scope, key, spec.initialValue),
        set: value => context.setLocal(scope, key, value),
      })
    }
    if (spec.server) {
      Object.defineProperty(scope, key, {
        writeable: true,
        get: () => context.getServer(scope, key, spec.initialValue),
        set: value => context.setServer(scope, key, value),
      })
    }
  })

  return scope
}

export default createScope
