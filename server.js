const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const app = require('./app.js')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
