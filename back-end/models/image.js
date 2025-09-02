const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    file: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: false
    },
    fileType: {
        type: String,
        required: false
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject.id
        delete returnedObject._id
        delete returnedObject.__v
        return returnedObject
    }
})

module.exports = mongoose.model('Image', imageSchema)