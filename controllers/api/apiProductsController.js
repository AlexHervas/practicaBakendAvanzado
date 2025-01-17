import Product from '../../models/Product.js'

export async function apiProductList(req, res, next) {

    try {
        
        const skip = parseInt(req.query.skip) || 0
        const limit = parseInt(req.query.limit)
        const sort = req.query.sort || '_id'
        const price = req.query.price
        const fields = req.query.fields
  
        const filters = { }

        if (typeof price !== 'undefined' && price !== '-') {
            if (price.indexOf('-') === -1) filters.price = price
            else {
              filters.price = {}
              const range = price.split('-')
              if (range[0] !== '') filters.price.$gte = range[0]
              if (range[1] !== '') filters.price.$lte = range[1]
            }
          }
        
        if (typeof req.query.name !== 'undefined') {
            filters.name = new RegExp('^' + req.query.name, 'i')
        }

        const products = await Product.list(filters, skip, limit, sort, fields)
        const productsCount = await Product.countDocuments(filters)

        res.json({ 
            results: products,
            count: productsCount,
         })

    } catch (error) {
        next(error)
    }
}

export async function apiProductGetOne(req, res, next) {
    try {
        const productId = req.params.productId

        const product = await Product.findById(productId)

        res.json({ result: product })

    } catch (error) {
        next(error)
    }
}