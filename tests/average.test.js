const { average } = require('../utils/for_testing.js')

describe('average', () => {
  test('of one value is the value itself', () => {
    const result = average([1])
    expect(result).toBe(1)
  })

  test('of many is calculated right', () => {
    const result = average([2, 4, 6, 8, 10])
    expect(result).toBe(6)
  })

  test('of empty array is zero', () => {
    const result = average([])
    expect(result).toBe(0)
  })
})
