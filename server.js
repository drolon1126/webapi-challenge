const express = require('express');
const cors = require('cors');
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;