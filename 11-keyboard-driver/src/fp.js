export const intersperseBetween = (arr, delim) => arr.reduce(
  (accum, item, idx) => {
    if (idx !== 0) {
      accum.push(delim)
    }
    accum.push(item)
    return accum
  },
  []
)

export const interleave = (arr1, arr2) => {
  let arr = []
  arr1.forEach((item, idx) => {
    arr.push(item)
    if (idx < arr2.length) {
      arr.push(arr2[idx])
    }
  })
  return arr
}
