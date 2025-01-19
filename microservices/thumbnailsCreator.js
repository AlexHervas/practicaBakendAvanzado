import path from 'node:path'
import cote from 'cote'
import { Jimp } from 'jimp'

const RESIZING = {
  WIDTH: 100,
  HEIGHT: 100,
}

const createThumbnail = async ({ inputPath, outputPath, width, height }) => {
  try {
    const image = await Jimp.read(inputPath)

    image.resize({ w: width, h: height })

    await image.write(outputPath)
    console.log('Image resized succesfully, saved at:', outputPath)
    return { message: 'thumbnail created' }

  } catch (error) {
    console.error('Error resizing the image', error.message)
    return { error: 'Error creating the thumbnail' }
  }
}

const responder = new cote.Responder({ name: 'thumbnail-creator' })

responder.on('img-added-db', async (event, callback) => {
  const { image } = event
  const inputPath = path.join(import.meta.dirname, '..', 'public', 'productsImages', image)
  const outputPath = path.join(import.meta.dirname, '..', 'public', 'thumbnails', image)

  const { message, error } = await createThumbnail({ inputPath, outputPath, width: RESIZING.WIDTH, height: RESIZING.HEIGHT })

  const result = message ?? error

  callback(result)
})