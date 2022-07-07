const express = require('express')

const notesRouter = express.Router()
const Note = require('../models/note.js')
const User = require('../models/user.js')

// Get all notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
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

  const user = await User.findById(data.userId)

  // Creating a new note object
  const note = new Note({
    content: data.content,
    important: data.important || false,
    date: new Date(),
    user: user._id
  })

  // Saving note to DB
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
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
