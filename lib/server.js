'use strict';

const express = require('express');

const logger = require('./middleware/logger');
const timestamp = require('./middleware/timestamp');
const fiveZeroZero = require('./middleware/500');
const fourZeroFour = require('./middleware/404');
const db = require('../data/db.json');
const { swagger, options } = require('../docs/swagger');

const app = express();

const expressSwagger = swagger(app);
expressSwagger(options);

// Application Middleware
app.use(express.json());
app.use(logger);
app.use(timestamp);

/**
 * This route gives you the standard "homepage" message
 * @route GET /
 * @returns {object} 200 - Homepage HTML
 */
app.get('/', function (req, res) {
  return res.send('<h2>Homepage</h2>');
});

/**
 * This route handles internal errors
 * @route GET /api/v1/error-thrown
 * @returns {Error} 500 - Internal Error
 */
app.get('/error-thrown', function (req, res, next) {
  next('Error: Internal Error');
});

/**
 * This route gives you the list of categories and the length of the list.
 * @route GET /api/v1/categories
 * @group Categories
 * @returns {object} 200 - the count of categories and an array of the categories.
 */
app.get('/api/v1/categories', function (req, res) {
  return res.send({ count: db.categories.length, results: db.categories });
});

/**
 * This route adds a new category to the array.
 * @route POST /api/v1/categories
 * @group Categories
 * @param {number} id.body.required - id of the category to update
 * @param {string} name.body.required - new name for category
 * @param {string} display_name.body - new display_name for category
 * @param {string} description.body - new description for category
 * @returns {object} 200 - the newly created/added category
 * @returns {object} 400 - invalid id or name given
 */
app.post('/api/v1/categories', function (req, res) {
  let category = {
    id: req.body.id,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  if (!category.id || !category.name) {
    return res.status(400).send('<h2>Invalid Input</h2>');
  }
  db.categories.push(category);
  return res.send(category);
});

/**
 * This route updates the category with the given id
 * @route PUT /api/v1/categories/:id
 * @group Categories
 * @param {number} id.params.required - id of the category to update
 * @param {string} name.body.required - new name for category
 * @param {string} display_name.body - new display_name for category
 * @param {string} description.body - new description for category
 * @returns {object} 200 - the updated category
 * @returns {object} 404 - couldnt find category with given id
 */
app.put('/api/v1/categories/:id', function (req, res) {
  let category = {
    id: parseInt(req.params.id),
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let index = db.categories.findIndex((current) => {
    return current.id === parseInt(req.params.id);
  });
  if (index === -1) {
    return res.status(404).send('<h2>No matching category found.</h2>');
  }
  db.categories[index] = category;
  return res.send(category);
});

/**
 * This route deletes the category with the given id
 * @route DELETE /api/v1/categories/:id
 * @group Categories
 * @param {number} id.params.required - id of the category to delete
 * @returns {object} 200 - successfully deleted category
 * @returns {object} 404 - couldnt find category with given id
 */
app.delete('/api/v1/categories/:id', function (req, res) {
  let index = db.categories.findIndex((current) => {
    return current.id === parseInt(req.params.id);
  });
  if (index === -1) {
    return res.status(404).send('<h2>No matching category found.</h2>');
  }
  let deleted = db.categories.splice(index, 1)[0];
  return res.send(deleted);
});

/**
 * This route gives you the list of products and the length of the list.
 * @route GET /api/v1/products
 * @group Products
 * @returns {object} 200 - the count of products and an array of the products.
 */
app.get('/api/v1/products', function (req, res) {
  return res.send({ count: db.products.length, results: db.products });
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
app.post('/api/v1/products', function (req, res) {
  let product = {
    id: req.body.id,
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  if (!product.id || !product.category || !product.name) {
    return res.status(400).send('<h2>Invalid input</h2>');
  }
  db.products.push(product);
  return res.send(product);
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
app.put('/api/v1/products/:id', function (req, res) {
  let product = {
    id: parseInt(req.params.id),
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let index = db.products.findIndex((current) => {
    return current.id === parseInt(req.params.id);
  });
  if (index === -1) {
    return res.status(404).send('<h2>No matching product found.</h2>');
  }
  db.products[index] = product;
  return res.send(product);
});

/**
 * This route deletes the product with the given id
 * @route DELETE /api/v1/products/:id
 * @group Products
 * @param {number} id.params.required - id of the product to delete
 * @returns {object} 200 - the deleted product
 * @returns {object} 404 - couldnt find product with given id
 */
app.delete('/api/v1/products/:id', function (req, res) {
  let index = db.products.findIndex((current) => {
    return current.id === parseInt(req.params.id);
  });
  if (index === -1) {
    res.status(404).send('<h2>No matching product found.</h2>');
  }
  let deleted = db.products.splice(index, 1)[0];
  return res.send(deleted);
});

// Router Middleware
app.use('*', fourZeroFour);
app.use(fiveZeroZero);

module.exports = app;
