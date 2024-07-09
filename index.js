const express = require('express')

const app = express()

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: true,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)

  // If the current middleware function does not end the request-response cycle,
  // it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  next()
}

// Middleware functions have to be used before routes when we want them to be executed by the route event handlers.
app.use(express.json()) // Middleware to parse the input JSON data
app.use(requestLogger) // Custom middleware

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find((note) => note.id === Number(id))

  // Guard clause to check if the note with the requested is not found
  if (!note) {
    return res.status(404).json({ message: `Note with id ${id} is not found` })
  }

  res.json(note)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  // Guard clause to check if the content is provided or not
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  }

  notes = [...notes, note]

  res.json(notes)
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

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
