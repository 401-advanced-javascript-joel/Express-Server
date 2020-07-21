'use strict';

const { categoriesModel, productsModel } = require('../models/Model');

const findModel = (req, res, next) => {
  if (req.params.model) {
    switch (req.params.model) {
      case 'categories':
        req.model = categoriesModel;
        break;
      case 'products':
        req.model = productsModel;
        break;
      default:
        return res.status(404).send();
    }
  }
  next();
};

module.exports = findModel;
