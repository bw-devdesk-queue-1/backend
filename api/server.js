const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/authRouter.js');
const authenticate = require('../auth/authenticate-middleware.js');

const server = express();

var whitelist = ['http://localhost:5000'] // todo add frontend hosted
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', cors(corsOptions), authRouter);
// server.use('/api/dev', authenticate, devRouter);

server.get('/', (req, res) => {
    res.sta
})

module.exports = server;