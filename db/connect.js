const mongoose = require('mongoose')
const logger = require('../utils/logger.js')

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('connected to mongoDB')
  } catch (error) {
    logger.error('error connecting to MongoDB: ', error.message)
  }
}

module.exports = connectDB
