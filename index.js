require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note.js')

const app = express()

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)

  // If the current middleware function does not end the request-response cycle,
  // it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  next()
}

// Middleware functions have to be used before routes when we want them to be executed by the route event handlers.
app.use(express.static('dist')) // Middleware to serve static files
app.use(cors())
app.use(express.json()) // Middleware to parse the input JSON data
app.use(requestLogger) // Custom middleware

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.status(200).json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id

  Note.findById(id).then((note) => {
    res.status(200).json(note)
  })
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  // Guard clause to check if the content is provided or not
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newNote = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  newNote.save().then((savedNote) => {
    res.status(201).json(savedNote)
  })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter((note) => note.id !== Number(id))

  res.status(204).end()
})

// Sometimes, we want to use middleware functions after routes.
// We do this when the middleware functions are only called if no route handler processes the HTTP request.
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
