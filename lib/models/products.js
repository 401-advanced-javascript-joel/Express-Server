'use strict';

const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    category: { required: true, type: String },
    name: { required: true, type: String },
    display_name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

const products = new mongoose.model('products', productsSchema);

module.exports = products;
