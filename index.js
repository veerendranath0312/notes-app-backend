const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json()) // parse the incoming JSON

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

app.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome to Notes API</h2>')
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes)
})

app.post('/api/notes', (req, res) => {
  const data = req.body

  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0

  const newNote = {
    id: maxId + 1,
    content: data.content,
    important: Math.random() < 0.5
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(note => note.id === Number(id))

  if (!note) {
    return res
      .status(400)
      .json({ msg: 'Data not found or provide a valid number' })
  }

  res.status(200).json({ note })
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
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
