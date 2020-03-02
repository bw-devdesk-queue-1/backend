const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/authRouter.js');
const authenticate = require('../auth/authenticate-middleware.js');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
// server.use('/api/dev', authenticate, devRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Dev Desk API</h1>`)
})

module.exports = server;