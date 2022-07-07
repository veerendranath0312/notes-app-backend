const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')

const app = express()

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    logger.error('error connecting to MongoDB: ', err.message)
  })

app.use(cors())
app.use(express.static('/build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/v1/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
