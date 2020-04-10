const Router = require('express').Router;

const { productsModel } = require('../models/Model');

const products = new Router();

/**
 * This route gives you the list of products and the length of the list.
 * @route GET /api/v1/products
 * @group Products
 * @returns {object} 200 - the count of products and an array of the products.
 */
products.get('/api/v1/products', async function (req, res) {
  let results = await productsModel.read();
  return res.send({ count: results.length, results: results });
});

/**
 * This route gets the specified product from the db
 * @route GET /api/v1/products:id
 * @group Products
 * @param {string} id.params.required - id of the product to return
 * @returns {object} 200 - the product
 * @returns {object} 400 - no id given
 * @returns {object} 404 - no matching product found
 */
products.get('/api/v1/products/:id', async function (req, res) {
  let result = await productsModel.readOne(req.params.id);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

/**
 * This route adds a new product to the array.
 * @route POST /api/v1/products
 * @group Products
 * @param {number} id.body.required - id of the product to add
 * @param {string} category.body.required - new category for product
 * @param {string} name.body.required - new name for product
 * @param {string} display_name.body - new display_name for product
 * @param {string} description.body - new description for product
 * @returns {object} 200 - the newly created/added category
 * @returns {object} 400 - invalid id, category, or name
 */
products.post('/api/v1/products', async function (req, res) {
  let product = {
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let result = await productsModel.create(product);
  if (!result) {
    return res.status(400).send({});
  }
  return res.send(result);
});

/**
 * This rout updates the product with the given id
 * @route PUT /api/v1/products/:id
 * @group Products
 * @param {number} id.params.required - id of the product to update
 * @param {string} category.body.required - new category for product
 * @param {string} name.body.required - new name for product
 * @param {string} display_name.body - new display_name for product
 * @param {string} description.body - new description for product
 * @returns {object} 200 - the updated product
 * @returns {object} 404 - couldnt find product with given id
 */
products.put('/api/v1/products/:id', async function (req, res) {
  let product = {
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let result = await productsModel.update(req.params.id, product);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

/**
 * This route deletes the product with the given id
 * @route DELETE /api/v1/products/:id
 * @group Products
 * @param {number} id.params.required - id of the product to delete
 * @returns {object} 200 - the deleted product
 * @returns {object} 404 - couldnt find product with given id
 */
products.delete('/api/v1/products/:id', async function (req, res) {
  let result = await productsModel.delete(req.params.id);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

module.exports = products;
