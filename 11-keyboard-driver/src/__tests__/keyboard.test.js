import createKeyboardZone from '../keyboard'
import lolex from 'lolex'

describe('keyboard driver', () => {
  let zone
  let clock
  let lastEvent

  beforeEach(() => {
    clock = lolex.install()
    zone = createKeyboardZone({
      initialDelay: 200,
      repeatDelay: 25,
      doubleClickInterval: 200,
    })
    zone.subscribe(e => { lastEvent = e })
    lastEvent = null
  })

  afterEach(() => {
    clock.uninstall()
  })

  /* eslint-disable no-unused-vars */
  const controlUp = () => ({ type: 'up', key: 'Control' })
  const controlDown = () => ({ type: 'down', key: 'Control' })
  /* eslint-enable no-unused-vars */
  const keyUp = key => zone.process({ type: 'up', key })
  const keyDown = key => zone.process({ type: 'down', key })
  const wait = ms => clock.tick(ms)

  describe('key repeat', () => {
    it('generates keypress after first down', () => {
      zone.subscribe(e => { lastEvent = e })
      keyDown('a')
      expect(lastEvent).toMatchObject({ key: 'a', type: 'charLiteral' })
    })

    it('generates another keypress after the initialDelay', async () => {
      zone.subscribe(e => { lastEvent = e })
      keyDown('a')
      lastEvent = null
      wait(150)
      // hasn't repeated quite yet
      expect(lastEvent).toBeNull()
      wait(50)
      // enough time has passed
      expect(lastEvent).toMatchObject({ key: 'a', type: 'charLiteral' })
    })

    it('it only repeats the last key pressed', () => {
      let countCharLiteralA = 0
      let countCharLiteralB = 0
      zone.subscribe(e => {
        if (e.type === 'charLiteral' && e.key === 'a') { countCharLiteralA++ }
        if (e.type === 'charLiteral' && e.key === 'b') { countCharLiteralB++ }
      })
      keyDown('a')
      wait(50)
      keyDown('b')
      wait(150)
      expect(countCharLiteralA).toEqual(1)
      wait(50)
      expect(countCharLiteralA).toEqual(1)
      expect(countCharLiteralB).toEqual(2)
      expect(lastEvent).toMatchObject({ key: 'b', type: 'charLiteral' })
    })

    it('continues to repeat the key', () => {
      let count = 0
      zone.subscribe(e => {
        if (e.type === 'charLiteral' && e.key === 'a') { count++ }
      })
      expect(count).toEqual(0)
      keyDown('a')
      expect(count).toEqual(1)
      wait(200)
      expect(count).toEqual(2)
      wait(25)
      expect(count).toEqual(3)
      wait(20)
      expect(count).toEqual(3)
      wait(5)
      expect(count).toEqual(4)
    })

    it('stops repeating when another key is pressed', () => {
      let count = 0
      zone.subscribe(e => {
        if (e.type === 'charLiteral' && e.key === 'a') { count++ }
      })
      keyDown('a')
      wait(250)
      expect(count).toEqual(4)
      keyDown('b')
      wait(250)
      expect(count).toEqual(4)
    })

    it('stops repeating when the key is released', () => {
      let count = 0
      zone.subscribe(e => {
        if (e.type === 'charLiteral' && e.key === 'a') { count++ }
      })
      keyDown('a')
      wait(250)
      expect(count).toEqual(4)
      keyUp('a')
      wait(250)
      expect(count).toEqual(4)
    })
  })

  describe('control mode', () => {
    it('control mode disables keyboard repeat functionality', () => {
      let count = 0
      zone.subscribe(e => {
        if (e.type === 'charLiteral' && e.key === 'a') { count++ }
      })
      keyDown('Control')
      keyDown('a')
      wait(250)
      expect(count).toEqual(0)
    })

    it('creates chord events as keys are pressed', () => {
      zone.subscribe(e => {
        if (e.type === 'keyChord') { lastEvent = e }
      })
      keyDown('Control')
      keyDown('a')
      keyDown('f')
      expect(lastEvent).toMatchObject({ type: 'keyChord', keys: ['Control', 'a', 'f'] })
    })

    it('chord mode stops after first key is released', () => {
      let lastChord
      zone.subscribe(e => {
        if (e.type === 'keyChord') { lastChord = e }
      })
      keyDown('Control')
      keyDown('a')
      keyDown('f')
      keyUp('a')
      keyDown('c')
      expect(lastChord).toMatchObject({ type: 'keyChord', keys: ['Control', 'a', 'f'] })
      expect(lastEvent).toMatchObject({ type: 'charLiteral', key: 'c' })
    })
  })

  describe('double click mode', () => {
    it('generates double click when pressed twice within the interval', () => {
      let lastDoubleClick
      zone.subscribe(e => {
        if (e.type === 'doubleClick') { lastDoubleClick = e }
      })
      keyDown('a')
      wait(10)
      keyUp('a')
      wait(20)
      keyDown('a')
      expect(lastDoubleClick).toMatchObject({ type: 'doubleClick', key: 'a' })
    })

    it('cancels double click when another key is pressed inbetween', () => {
      let lastDoubleClick
      zone.subscribe(e => {
        if (e.type === 'doubleClick') { lastDoubleClick = e }
      })
      keyDown('a')
      wait(10)
      keyUp('a')
      wait(20)
      keyDown('b')
      keyDown('a')
      expect(lastDoubleClick).toBeUndefined()
    })
  })
})
