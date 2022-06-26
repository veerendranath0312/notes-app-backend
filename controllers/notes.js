const express = require('express')

const notesRouter = express.Router()
const Note = require('../models/note.js')

// Get all notes
notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

// Create a note
notesRouter.post('/', (req, res, next) => {
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
  note
    .save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
})

// Get note by ID
notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
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
