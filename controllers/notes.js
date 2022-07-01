const express = require('express')

const notesRouter = express.Router()
const Note = require('../models/note.js')

// Get all notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

// Create a note
notesRouter.post('/', async (req, res) => {
  const data = req.body

  // Checking if the content property is valid or not
  if (!data.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  // Creating a new note object
  const note = new Note({
    content: data.content,
    important: data.important || false,
    date: new Date()
  })

  // Saving note to DB
  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

// Get note by ID
notesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id)

  note ? res.json(note) : res.status(404).end()
})

notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Note.findByIdAndDelete(id)
  res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err))
})

module.exports = notesRouter
