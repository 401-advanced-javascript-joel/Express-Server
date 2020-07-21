'use strict';

const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    category: { required: true, type: String },
    name: { required: true, type: String },
    description: { type: String },
    image: { type: String },
    price: { required: true, type: Number },
    inStock: { required: true, type: Number },
  },
  {
    timestamps: true,
  },
);

const products = new mongoose.model('products', productsSchema);

module.exports = products;
