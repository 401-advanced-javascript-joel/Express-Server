'use strict';

const app = require('./lib/server');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
