'use strict';

const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: { required: true, type: String, unique: true },
    displayName: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

categoriesSchema.virtual('products', {
  ref: 'products',
  localField: 'name',
  foreignField: 'category',
});

categoriesSchema.pre(['find', 'findOne'], function () {
  this.populate('products');
});

const categories = new mongoose.model('categories', categoriesSchema);

module.exports = categories;
