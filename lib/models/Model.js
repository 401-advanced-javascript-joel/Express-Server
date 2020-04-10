'use strict';

const categories = require('./categories');
const products = require('./products');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    let result;
    try {
      result = await this.schema.create(record);
    } catch (e) {
      console.error('Error', e.message);
    }
    return result;
  }

  async read() {
    let results;
    try {
      results = await this.schema.find({});
    } catch (e) {
      result = { Error: e.message };
    }
    return results;
  }

  async readOne(id) {
    let result;
    try {
      result = await this.schema.findById(id);
    } catch (e) {
      console.error('Error', e.message);
    }
    return result;
  }

  async update(id, record) {
    let result;
    try {
      result = await this.schema.findByIdAndUpdate(id, record, { new: true });
    } catch (e) {
      console.error('Error', e.message);
    }
    return result;
  }

  async delete(id) {
    let result;
    try {
      result = await this.schema.findByIdAndDelete(id);
    } catch (e) {
      console.error('Error', e.message);
    }
    return result;
  }
}

module.exports = {
  categoriesModel: new Model(categories),
  productsModel: new Model(products),
};
