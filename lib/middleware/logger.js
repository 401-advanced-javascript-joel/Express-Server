'use strict';

const logger = (req, res, next) => {
  console.log('request made to', req.method, req.url, 'at', new Date());
  next();
};

module.exports = logger;
