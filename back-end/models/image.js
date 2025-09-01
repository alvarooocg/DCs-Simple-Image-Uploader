const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    file: {
        type: Buffer,
        required: true
    }
})

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Image', imageSchema)