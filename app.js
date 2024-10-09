const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const notesRouter = require('./routes/noteRoutes.js')
const usersRouter = require('./routes/userRouter.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB...')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) =>
    logger.error('Error connecting to MongoDB: ', error.message)
  )

app.use(cors())
app.use(express.static('dist')) // Middleware to serve static files
app.use(express.json()) // Middleware to parse the input JSON data
app.use(middleware.requestLogger) // Custom middleware

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)

// This has to be the last loaded middleware,
// also all the routes should be registered before this!
app.use(middleware.errorHandler)

module.exports = app
