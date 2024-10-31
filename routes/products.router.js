const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  console.log('heerr')
  const products = await service.find();
  res.status(200).json(products)
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.status(200).json(product)
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const product = await service.create(body);

  res.status(201).json({
    message: 'product was created',
    data: product
  })
})

router.patch('/:id', async (req, res) => {
  
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
  
    res.status(200).json({
      message: `product ${id} was updated`,
      data: product
    })
  } catch {
    res.status(404).json({
      message: `product not found`,
      data: {}
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);

  res.status(200).json(rta)
})

module.exports = router;