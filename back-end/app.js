const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const imagesRouter = require('./controllers/images')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
    .then(result => 
        logger.info('Connected to MongoDB')
    )
    .catch(error => 
        logger.error('Error connecting to MongoDB: ', error.message)
    )

app.use(cors({
    origin: [
        config.FRONTEND_URL,
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.static('dist'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true}))

app.use(middleware.requestLogger)

app.use('/api', imagesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app