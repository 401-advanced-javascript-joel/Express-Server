'use strict';

const fourZerofour = (req, res, next) => {
  res.status(404).send('<h2>404 Page Not Found</h2>');
};

module.exports = fourZerofour;
