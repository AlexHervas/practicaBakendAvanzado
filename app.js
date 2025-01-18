import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import connectMongoose from './lib/connectMongoose.js'
import * as sessionManager from './lib/sessionManager.js'
import {homeController, loginController, productsController} from './controllers/index.js'
import upload from './lib/uploadConfigure.js'
import * as apiProductsController from './controllers/api/apiProductsController.js'

// espero a que se conecte a la base de datos
console.log('Connecting to DB...')
const { connection: mongooseConnection } = await connectMongoose()
console.log('Conectado a MongoDB en', mongooseConnection.name)

const app = express()

// view engine setup
app.set('views', 'views')
app.set('view engine', 'ejs')

app.locals.siteTitle = 'NodePop'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))

/**
 * API routes
 */
app.get('/api/products', apiProductsController.apiProductList)
app.get('/api/products/:productId', apiProductsController.apiProductGetOne)
app.post('/api/products',  upload.single('image'), apiProductsController.apiProductNew)
app.put('/api/products/:productId', upload.single('image'), apiProductsController.apiProductUpdate)

/**
 * Application routes
 */
app.use(sessionManager.middleware, sessionManager.useSessionInViews)

app.get('/', homeController.index)
// session
app.get('/login', loginController.indexLogin)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)
{ // products
  const productsRouter = express.Router()
  // productsRouter.use(session.guard) -- optional
  productsRouter.get('/new', productsController.indexNew)
  productsRouter.post('/new', upload.single('image'), productsController.postNew)
  productsRouter.get('/delete/:productId', productsController.deleteOne)
  app.use('/products', sessionManager.guard, productsRouter)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {

  // validation errors
  if (err.array) {
    err.message = 'Invalid request: ' + err.array()
    .map(e => `${e.location} ${e.type} ${e.path} ${e.msg}`)
    .join(', ')
    err.status = 422
  }


  res.status(err.status || 500)

  // API error, send response with JSON
  if(req.url.startsWith('/api/')) {
    res.json({ error: err.message })
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.render('error')
})

export default app
