const express = require('express')
const cors = require('cors')
const notesRouter = require('./controllers/notes.js')
const middleware = require('./utils/middleware.js')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json()) // parse the incoming JSON

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
