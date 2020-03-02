const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');
const {validateUser, validateCreateUser, validateCredentials} = require('../users/user-middleware.js');

const jwt = require('jsonwebtoken'); // installed this library
const secrets = require('./config/secret.js');

// actions
router.post('/register', validateCreateUser, (req, res) => {
    // create hash
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;
    
    // add the user to the database
    Users.insert(credentials)
    .then( id => {
        res.status(201).json({id: id[0], ...credentials.username})
    })
    .catch( err => {
        res.status(500).json({errorMessage: "The user could not be created."})
    })
})

router.post('/login', validateUser, validateCredentials, (req, res) => {
    let { id, username, password } = req.body;
    Users.findBy(username)
        .then(user => {
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user); // new line
    
            // the server needs to return the token to the client
            // this doesn't happen automatically like it happens with cookies
            res.status(200).json({
                id: id,
                username: username,            
                userType: user.userType, // return userType
                token // attach the token as part of the response
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    type: user.userType
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}



module.exports = router;