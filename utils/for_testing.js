const reverse = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  if (array.length === 0) {
    return 0
  }

  const total = array.reduce((sum, acc) => sum + acc, 0)
  return total / array.length
}

module.exports = { reverse, average }
