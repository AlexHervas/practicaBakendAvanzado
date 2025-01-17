import multer from 'multer'
import path from 'node:path'

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const ruta = path.join(import.meta.dirname, '..', 'public', 'productsImages')
        callback(null, ruta)
    },
    filename: function(req, file, callback) {
        const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

const upload = multer({ storage })

export default upload