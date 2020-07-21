'use strict';

const db = require('./data/mongoose');
const app = require('./lib/server');
const port = process.env.PORT;

app.start(port, db);
