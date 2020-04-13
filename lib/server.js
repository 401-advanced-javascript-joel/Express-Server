'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const f500 = require('./middleware/500');
const f404 = require('./middleware/404');
const { swagger, options } = require('../docs/swagger');
const modelRoutes = require('./routes/model');

// create app
const app = express();

const expressSwagger = swagger(app);
expressSwagger(options);

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

/**
 * This route gives you the standard "homepage" message
 * @route GET /
 * @returns {object} 200 - Homepage HTML
 */
app.get('/', function (req, res) {
  return res.send('<h2>Homepage</h2>');
});

/**
 * This route handles internal errors
 * @route GET /error-thrown
 * @returns {Error} 500 - Internal Error
 */
app.get('/error-thrown', function (req, res, next) {
  next('Error: Internal Error');
});

app.use(modelRoutes);

// More Middleware
app.use('*', f404);
app.use(f500);

// start server function
const startServer = (port, db) => {
  db.start();
  app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
  });
};

module.exports = {
  server: app,
  start: startServer,
};
