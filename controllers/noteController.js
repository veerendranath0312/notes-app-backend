const Note = require('../models/note.js')

const getAllNotes = async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json(notes)
}

const getNote = (req, res, next) => {
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
}

const createNote = (req, res, next) => {
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
}

const updateNote = (req, res, next) => {
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
}

const deleteNote = (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
}

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
}
