const express = require('express')
const productsRouter = require('./products.router')

const router = express.Router();

const routerApi = (app) => {

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}

module.exports = routerApi;