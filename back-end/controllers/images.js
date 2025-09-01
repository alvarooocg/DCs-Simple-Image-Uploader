const imagesRouter = require('express').Router()
const Image = require('../models/image')

imagesRouter.post('/upload', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.file) {
            return response.status(400).json({ error: 'Image file missing' })
        }

        const image = new Image({
            id: body.id,
            file: body.file
        })

        const newImage = await image.save()
        response.status(201).json(newImage)
    } catch (error) {
        next(error)
    }
})

imagesRouter.get('/download/:id', (request, response, next) => {
    Image.findOne({ id: request.params.id })
        .then(image => {
            if (image) response.json(image)
            else response.status(404).send({ error: 'not found' })
        })
        .catch(error => next(error))
})

module.exports = imagesRouter