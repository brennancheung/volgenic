const zone = () => {
  let subscribers = []

  const unsubscribeFn = fn => () => {
    subscribers = subscribers.filter(x => x !== fn)
  }

  const generate = e => process(e)

  const process = event => {
    const fns = subscribers.reverse()

    let propagate = true

    for (let fn of fns) {
      event.unsubscribe = unsubscribeFn(fn)
      event.generate = generate
      event.stopPropagation = () => { propagate = false }
      fn(event)
      if (!propagate) { break }
    }
  }

  const subscribe = handler => subscribers.push(handler)

  return {
    generate,
    process,
    subscribe,
  }
}

export default zone
