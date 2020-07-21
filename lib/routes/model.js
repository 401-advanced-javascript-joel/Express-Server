const Router = require('express').Router;

const findModel = require('../middleware/model-finder');

const router = new Router();

/**
 * This route gives you the list of records and the length of the list.
 * @route GET /api/v1/:model
 * @group crud
 * @param {string} model.params.required - the model in the db to interact with
 * @returns {object} 200 - the count of records and an array of the records.
 */
router.get('/api/v1/:model', findModel, async function (req, res) {
  let results = await req.model.read();
  if (results.error) {
    return res.status(404).send(results);
  }
  return res.send({ count: results.length, results: results });
});

/**
 * This route gets the specified record from the db
 * @route GET /api/v1/:model/:id
 * @group crud
 * @param {string} model.params.required - the model in the db to interact with
 * @param {string} id.params.required - id of the record to return
 * @returns {object} 200 - the record
 * @returns {object} 404 - error no record found
 */
router.get('/api/v1/:model/:id', findModel, async function (req, res) {
  let id = req.params.id;
  let result = await req.model.readOne(id);
  if (!result) {
    return res.status(404).send();
  }
  if (result.error) {
    return res.status(400).send(result);
  }
  return res.send(result);
});

/**
 * This route adds a new record to the database.
 * @route POST /api/v1/:model
 * @group crud
 * @param {string} model.params.required - the model in the db to interact with
 * @returns {object} 200 - the newly created/added record
 * @returns {object} 400 - invalid id or name given
 */
router.post('/api/v1/:model', findModel, async function (req, res) {
  let result = await req.model.create(req.body);
  if (result.error) {
    return res.status(400).send(result);
  }
  return res.send(result);
});

/**
 * This route updates the record with the given id
 * @route PUT /api/v1/:model/:id
 * @group crud
 * @param {string} model.params.required - the model in the db to interact with
 * @param {string} id.params.required - id of the record to update
 * @returns {object} 200 - the updated record
 * @returns {object} 404 - couldnt find matching record
 */
router.put('/api/v1/:model/:id', findModel, async function (req, res) {
  let result = await req.model.update(req.params.id, req.body);
  if (!result) {
    return res.status(404).send();
  }
  if (result.error) {
    return res.status(400).send(result);
  }
  return res.send(result);
});

/**
 * This route deletes the record with the given id
 * @route DELETE /api/v1/:model/:id
 * @group crud
 * @param {string} model.params.required - the model in the db to interact with
 * @param {number} id.params.required - id of the record to delete
 * @returns {object} 200 - successfully deleted record
 * @returns {object} 404 - couldnt find matching record
 */
router.delete('/api/v1/:model/:id', findModel, async function (req, res) {
  let result = await req.model.delete(req.params.id);
  if (!result) {
    return res.status(404).send();
  }
  if (result.error) {
    return res.status(400).send(result);
  }
  return res.send(result);
});

module.exports = router;
