'use strict';

const timestamp = (req, res, next) => {
  req.requestTime = new Date();
  next();
};

module.exports = timestamp;
