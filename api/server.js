const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/authRouter.js');
const authenticate = require('../auth/authenticate-middleware.js');

const ticketRouter = require('../users/tickets/ticketRouter.js');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

/* 
    /api/auth -> registerin and login
    /api/tickets -> base ticket functionality
    -- will include grabbing a ticket by id via /:id

    /api/tickets/:id/students -> student specific ticket stuff
    -- will include grabbing all student's ticket via /:studentId
    ---- /api/tickets/:id/students/:studentId
    -- able to get ticket id via .Router({mergeParams: true});

    /api/tickets/:id/helpers -> helper specific ticket stuff
    -- will inlcude grabbing all helper assigned tickets via /:helperId
    ---- /api/tickets/:id/helpers/:helperId
    -- able to get ticket id via .Router({mergeParams: true});
*/

server.use('/api/auth', authRouter);
server.use('/api/tickets', ticketRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Dev Desk API</h1>`)
})

module.exports = server;