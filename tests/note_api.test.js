const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Note = require('../models/note.js')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.create(initialNotes[0])
  await Note.create(initialNotes[1])
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map((e) => e.content)

  // assert.strictEqual(contents.includes('HTML is easy'), true)
  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})

// ------------------------------------------------------------
// Patterns to run the tests
// ------------------------------------------------------------
// test.only('there are two notes', async () => {
//   const response = await api.get('/api/notes')
//   assert.strictEqual(response.body.length, initialNotes.length)
// })

// npm test -- --test-only
// --> To run test like this, the tests are marked with .only()
// npm test -- tests/note_api.test.js
// npm test -- --test-name-pattern="name of the test goes here"
