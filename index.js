const app = require('./app.js')
const connectDB = require('./db/connect.js')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')

const start = async () => {
  try {
    await connectDB(config.MONGODB_URI)
    app.listen(config.PORT, () => {
      logger.info(`Server running at http://localhost:${config.PORT}/`)
    })
  } catch (error) {
    logger.error('Error: ', error.message)
  }
}

start()
