const express = require('express');

const AccountRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h3>WEB DB PROJECT 1</h3>');
});

module.exports = server;