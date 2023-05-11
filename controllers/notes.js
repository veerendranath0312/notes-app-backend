const express = require('express')
const Note = require('../models/note.js')

const notesRouter = express.Router()

// Get all notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

// Create a note
notesRouter.post('/', async (req, res) => {
  const data = req.body

  const newNote = new Note({
    content: data.content,
    important: data.important || false,
  })

  const savedNote = await newNote.save()
  res.status(201).json(savedNote)
})

// Get a note
notesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id)
  if (note) {
    res.status(200).json(note)
  } else {
    res.status(404).json({ msg: 'note you are searching not found' })
  }
})

// Update a note
notesRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  const data = req.body

  const note = {
    content: data.content,
    important: data.important,
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

// Delete a note
notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Note.findByIdAndRemove(id)
  res.status(204).end()
})

module.exports = notesRouter
