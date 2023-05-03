require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect.js')
const Note = require('./models/note.js')

const app = express()

app.use(cors())
app.use(express.json()) // parse the incoming JSON
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome to Notes API</h2>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.post('/api/notes', (req, res) => {
  const data = req.body

  if (data.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newNote = new Note({
    content: data.content,
    important: data.important || false
  })

  newNote.save().then(savedNote => {
    res.status(201).json(savedNote)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params

  Note.findById(id).then(note => {
    res.status(200).json(note)
  })
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params

  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

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
