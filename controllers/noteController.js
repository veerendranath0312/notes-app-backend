const Note = require('../models/note.js')

const getAllNotes = async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json(notes)
}

const getNote = async (req, res) => {
  const id = req.params.id

  const note = await Note.findById(id)
  if (note) {
    res.status(200).json(note)
  } else {
    res.status(404).end()
  }
}

const createNote = async (req, res) => {
  const body = req.body

  const createdNote = await Note.create({
    content: body.content,
    important: body.important || false,
  })

  res.status(201).json(createdNote)
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

const deleteNote = async (req, res) => {
  const id = req.params.id
  await Note.findByIdAndDelete(id)
  res.status(204).end()
}

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
}
