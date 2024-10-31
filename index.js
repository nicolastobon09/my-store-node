const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const PORT = 3000;

app.use(express.json())

const withelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (withelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World! using express')
})
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

routes(app)