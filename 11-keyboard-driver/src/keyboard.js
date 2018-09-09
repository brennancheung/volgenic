import createZone from './zone'

const defaultOptions = {
  initialDelay: 200,
  doubleClickInterval: 200,
  repeatDelay: 25,
  tickInterval: 25,
}

const elapsed = ts => Date.now() - ts

const startDown = key => ({ key, start: Date.now(), isRepeating: false })

const createKeyboardZone = (config = {}) => {
  const {
    initialDelay,
    doubleClickInterval,
    repeatDelay,
    tickInterval,
  } = { ...defaultOptions, ...config }

  const zone = createZone()
  let heldKeys = []
  let lastDown = {}
  let lastDoubleDown = {}
  let chordMode = false
  const specialKeys = ['Control', 'Alt']
  let lastTarget

  const repeatTickHandler = () => {
    if (chordMode) { return }
    if (lastDown.key && lastDown.isRepeating === false && elapsed(lastDown.start) >= initialDelay) {
      lastDown.isRepeating = true
      zone.generate({ type: 'charLiteral', key: lastDown.key })
      lastDown.repeatStart = Date.now()
    }

    if (lastDown.isRepeating && elapsed(lastDown.repeatStart) >= repeatDelay) {
      lastDown.repeatStart = Date.now()
      zone.generate({ type: 'charLiteral', key: lastDown.key })
    }
  }

  setInterval(repeatTickHandler, tickInterval)

  const repeatHandler = ({ type, key }) => {
    if (specialKeys.includes(key)) { return }

    switch (type) {
      case 'down':
        if (!chordMode) {
          zone.generate({ type: 'charLiteral', key })
        }
        lastDown = startDown(key)
        break

      case 'up':
        if (lastDown.key === key) { lastDown = {} }
        break
    }
  }

  const specialHandler = e => {
    const { type, key } = e
    if (specialKeys.includes(key) && type === 'down') { chordMode = true }

    if (!chordMode) { return }

    if (type === 'down') {
      heldKeys.push(key)
      zone.generate({ type: 'keyChord', keys: heldKeys })
    }

    if (type === 'up') {
      chordMode = false
      heldKeys = []
    }
  }

  const doubleClickHandler = ({ type, key }) => {
    if (type === 'down') {
      if (lastDoubleDown.key === key) {
        const duration = elapsed(lastDoubleDown.start)
        if (duration > 0 && duration <= doubleClickInterval) {
          zone.generate({ type: 'doubleClick', key })
          lastDoubleDown = {}
        }
      } else {
        lastDoubleDown = startDown(key)
      }
    }
  }

  const setTarget = e => {
    lastTarget = e.target
  }

  const dispatchEvent = e => {
    if (e.type === 'charLiteral') {
      console.log(e)
      if (lastTarget) {
        console.log(e.key)
        lastTarget.value += 's'
      }
    }
  }

  zone.subscribe(repeatHandler)
  zone.subscribe(specialHandler)
  zone.subscribe(doubleClickHandler)
  zone.subscribe(dispatchEvent)
  zone.subscribe(setTarget)

  return zone
}

export default createKeyboardZone
