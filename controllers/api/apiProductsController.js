import Product from '../../models/Product.js'

export async function apiProductList(req, res, next) {

    try {
        
        const skip = parseInt(req.query.skip) || 0
        const limit = parseInt(req.query.limit)
        const sort = req.query.sort || '_id'
  
        const filters = { }

        const products = await Product.list(filters, skip, limit, sort)

        res.json({ result: products })

    } catch (error) {
        next(error)
    }
}