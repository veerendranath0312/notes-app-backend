const { test } = require('node:test')
const assert = require('node:assert')
const { reverse } = require('../utils/forTesting')

test('reverse of a', () => {
  const result = reverse('a')
  // Tests strict equality between the actual and expected parameters
  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')
  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')
  assert.strictEqual(result, 'saippuakauppias')
})
