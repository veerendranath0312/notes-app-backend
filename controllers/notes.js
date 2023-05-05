const express = require('express')
const Note = require('../models/note.js')

const notesRouter = express.Router()

// Get all notes
notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => res.json(notes))
})

// Create a note
notesRouter.post('/', (req, res, next) => {
  const data = req.body

  const newNote = new Note({
    content: data.content,
    important: data.important || false,
  })

  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote)
    })
    .catch((error) => next(error))
})

// Get a note
notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.status(200).json(note)
      } else {
        res.status(404).json({ msg: 'note you are searching not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
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
notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

module.exports = notesRouter
