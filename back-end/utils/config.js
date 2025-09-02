require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

module.exports = {
    PORT, 
    MONGO_URI,
    FRONTEND_URL
}