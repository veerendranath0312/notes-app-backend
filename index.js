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

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.status(200).json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
  })

  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote)
    })
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      res.status(200).json(updatedNote)
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// Sometimes, we want to use middleware functions after routes.
// We do this when the middleware functions are only called if no route handler processes the HTTP request.
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if ((error.name = 'ValidationError')) {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)

// This has to be the last loaded middleware,
// also all the routes should be registered before this!
app.use(errorHandler)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
