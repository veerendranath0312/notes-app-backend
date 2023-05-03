require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect.js')
const Note = require('./models/note.js')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json()) // parse the incoming JSON

app.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome to Notes API</h2>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.post('/api/notes', (req, res, next) => {
  const data = req.body

  const newNote = new Note({
    content: data.content,
    important: data.important || false
  })

  newNote
    .save()
    .then(savedNote => {
      res.status(201).json(savedNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then(note => {
      if (note) {
        res.status(200).json(note)
      } else {
        res.status(404).json({ msg: 'note you are searching not found' })
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const data = req.body

  const note = {
    content: data.content,
    important: data.important
  }

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedNote => {
      res.status(200).json(updatedNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT || 8080

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

start()
