const bcrypt = require('bcryptjs');
const Users = require('./user-model.js')

module.exports = {
    validateUser,
    validateCredentials
}

function validateCreateUser(req,res,next) {
    // here we will check body for correct stuff to create
    if(!req.body.username || !req.body.password || !req.body.userType) {
        res.status(500).json({errorMessage: "Please send a username, password, and userType when creating a user."})
    } else {
        next();
    }
}

function validateUser(req,res,next) {
    // here we will check body for correct stuff to create
    if(!req.body.username || !req.body.password) {
        res.status(500).json({errorMessage: "Please send a username, password, and userType when creating a user."})
    } else {
        next();
    }
}

function validateCredentials(req, res, next) {
    // make sure the credentials match with db 
    const credentials = req.body;

    // find the user in the database by it's username then
    Users.findBy(credentials.username)
    .then( user => {
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return res.status(401).json({ error: 'Incorrect credentials' });
        } else {
            req.body.userId = user.id;
            next();
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "Could not find user."})
    })
}