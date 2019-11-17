import { isNumeric } from '../util'

describe('isNumeric', () => {
  it('with ints', () => {
    expect(isNumeric('123')).toEqual(true)
  })
  it('with 0', () => {
    expect(isNumeric('0')).toEqual(true)
    expect(isNumeric('0.0')).toEqual(true)
  })
  it('with bools', () => {
    expect(isNumeric('true')).toEqual(false)
    expect(isNumeric('false')).toEqual(false)
  })
  it('with floats', () => {
    expect(isNumeric('1.3')).toEqual(true)
    expect(isNumeric('5.')).toEqual(true)
    expect(isNumeric('5.0')).toEqual(true)
  })
  it('with invalid nums', () => {
    expect(isNumeric('asdf1.3')).toEqual(false)
    expect(isNumeric('e10')).toEqual(false)
    expect(isNumeric('1e10$')).toEqual(false)
    expect(isNumeric('foo')).toEqual(false)
    expect(isNumeric('5foo')).toEqual(false)
    expect(isNumeric('5foo')).toEqual(false)
  })
  it('with scientific', () => {
    expect(isNumeric('1e10')).toEqual(true)
  })
  it('with hex', () => {
    expect(isNumeric('0x10')).toEqual(true)
  })
})
