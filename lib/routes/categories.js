const Router = require('express').Router;

const { categoriesModel } = require('../models/Model');

const categories = new Router();

/**
 * This route gives you the list of categories and the length of the list.
 * @route GET /api/v1/categories
 * @group Categories
 * @returns {object} 200 - the count of categories and an array of the categories.
 */
categories.get('/api/v1/categories', async function (req, res) {
  let results = await categoriesModel.read();
  return res.send({ count: results.length, results: results });
});

/**
 * This route gets the specified category from the db
 * @route GET /api/v1/categories:id
 * @group Categories
 * @param {string} id.params.required - id of the category to return
 * @returns {object} 200 - the category
 * @returns {object} 400 - no id given
 * @returns {object} 404 - no matching category found
 */
categories.get('/api/v1/categories/:id', async function (req, res) {
  let id = req.params.id;
  let result = await categoriesModel.readOne(id);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

/**
 * This route adds a new category to the array.
 * @route POST /api/v1/categories
 * @group Categories
 * @param {string} name.body.required - new name for category
 * @param {string} display_name.body - new display_name for category
 * @param {string} description.body - new description for category
 * @returns {object} 200 - the newly created/added category
 * @returns {object} 400 - invalid id or name given
 */
categories.post('/api/v1/categories', async function (req, res) {
  let category = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let result = await categoriesModel.create(category);
  if (!result) {
    return res.status(400).send({});
  }
  return res.send(result);
});

/**
 * This route updates the category with the given id
 * @route PUT /api/v1/categories/:id
 * @group Categories
 * @param {string} id.params.required - id of the category to update
 * @param {string} name.body.required - new name for category
 * @param {string} display_name.body - new display_name for category
 * @param {string} description.body - new description for category
 * @returns {object} 200 - the updated category
 * @returns {object} 404 - couldnt find category with given id
 */
categories.put('/api/v1/categories/:id', async function (req, res) {
  let category = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  let result = await categoriesModel.update(req.params.id, category);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

/**
 * This route deletes the category with the given id
 * @route DELETE /api/v1/categories/:id
 * @group Categories
 * @param {number} id.params.required - id of the category to delete
 * @returns {object} 200 - successfully deleted category
 * @returns {object} 404 - couldnt find category with given id
 */
categories.delete('/api/v1/categories/:id', async function (req, res) {
  let result = await categoriesModel.delete(req.params.id);
  if (!result) {
    return res.status(404).send({});
  }
  return res.send(result);
});

module.exports = categories;
