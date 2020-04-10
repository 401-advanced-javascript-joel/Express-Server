'use strict';

const f500 = (error, req, res, next) => {
  res.status(500, 'Internal Server Error').send(error);
};

module.exports = f500;
