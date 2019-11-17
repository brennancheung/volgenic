import { isNumeric } from '../util'

describe('isNumeric', () => {
  it('works with ints', () => {
    expect(isNumeric('123')).toEqual(true)
  })
})