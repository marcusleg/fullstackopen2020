const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
