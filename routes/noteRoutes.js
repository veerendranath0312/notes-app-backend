const express = require('express')
const {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController.js')

const notesRouter = express.Router()

notesRouter.route('/').get(getAllNotes).post(createNote)
notesRouter.route('/:id').get(getNote).put(updateNote).delete(deleteNote)

module.exports = notesRouter
