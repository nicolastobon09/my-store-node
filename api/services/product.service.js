const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate(100);
  }

  generate(limit) {
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async create(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000)
    })
   }
  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const target = this.products[index];
    this.products[index] = {
      ...target,
      ...changes
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { message: 'Product  deleted'}
  }

}

module.exports = ProductsService;