'use strict';

const fiveZeroZero = (error, req, res, next) => {
  res.status(500, 'Internal Server Error').send(error);
};

module.exports = fiveZeroZero;
