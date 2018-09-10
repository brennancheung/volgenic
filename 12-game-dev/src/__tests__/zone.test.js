import createZone from '../zone'

describe('zone', () => {
  let zone

  beforeEach(() => {
    zone = createZone()
  })

  it('creates a zone', () => {
    expect(zone).toBeDefined()
  })

  it('allows subscribers and processes events', () => {
    let counter = 0
    zone.subscribe(() => { counter++ })
    zone.process({ nop: true })
    zone.process({ nop: true })
    expect(counter).toEqual(2)
  })

  it('newest subscribers get executed first (FILO)', () => {
    let foo = null
    zone.subscribe(() => {
      // This will never execute
      foo = 'first'
    })
    zone.subscribe(e => {
      foo = 'second'
      e.stopPropagation()
    })
    zone.process({ nop: true })
    expect(foo).toEqual('second')
  })

  it('stopPropagation', () => {
    let counter = 0
    zone.subscribe(() => { counter = 'foo' })
    zone.subscribe(e => {
      counter++
      e.stopPropagation()
    })
    zone.process({ nop: true })
    expect(counter).toEqual(1)
  })

  it('generate', () => {
    let _value = null
    zone.subscribe(e => {
      if (e.runIt) { e.generate({ value: 'bar' }) }
      _value = e.value
    })
    zone.process({ runIt: true, value: 'foo' })
    expect(_value).toEqual('foo')
  })
})
