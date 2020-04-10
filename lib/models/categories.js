'use strict';

const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    display_name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

const categories = new mongoose.model('categories', categoriesSchema);

module.exports = categories;
