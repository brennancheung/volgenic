import {
  intersperseBetween,
  interleave,
} from '../fp'

describe('fp', () => {
  describe('intersperseBetween', () => {
    it('intersperses a delimeter between each array element', () => {
      const arr = ['a', 'b', 'c']
      const interspersed = intersperseBetween(arr, ' ')
      expect(interspersed).toEqual(['a', ' ', 'b', ' ', 'c'])
    })
  })

  describe('interleave', () => {
    it('combines 2 arrays', () => {
      const arr1 = ['a', 'b', 'c']
      const arr2 = ['1', '2', '3']
      const interwoven = interleave(arr1, arr2)
      expect(interwoven).toEqual(['a', '1', 'b', '2', 'c', '3'])
    })

    it('combines 2 arrays with 2nd being shorter', () => {
      const arr1 = ['a', 'b', 'c']
      const arr2 = ['1', '2']
      const interwoven = interleave(arr1, arr2)
      expect(interwoven).toEqual(['a', '1', 'b', '2', 'c'])
    })

    it('combines 2 arrays with 1st being shorter', () => {
      const arr1 = ['a', 'b', 'c']
      const arr2 = ['1', '2', '3', '4', '5']
      const interwoven = interleave(arr1, arr2)
      expect(interwoven).toEqual(['a', '1', 'b', '2', 'c', '3'])
    })
  })
})
