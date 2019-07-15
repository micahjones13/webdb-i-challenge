// const express = require('express');

// const AccountRouter = require('./accounts/accounts-router.js');

// // const db = require('./data/dbConfig.js');

// const server = express();

// server.use(express.json());
// server.use('/api/accounts', AccountRouter);

// server.get('/', (req, res) => {
//     res.send('<h1>Web DB Challenge 1</h1>');
// })
// module.exports = server;

const express = require('express');

const AccountRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
});

module.exports = server;