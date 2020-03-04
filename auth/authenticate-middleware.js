const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // const secret = process.env.JWT_SECRET || "hotdogs"
  console.log("this is secrets", secrets)
  if (authorization) {
    jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken) => {
      console.log("This is req.headers", req.headers)
      if (err) {
        console.log("code", err.code, "name", err.name, "stack", err.stack)
        res.status(401).json({message: "Invalid Credentials"})
      } else {
        console.log(decodedToken)
        req.decodedToken = decodedToken

        next()
      }

    })
  } else {
  res.status(401).json({ message: 'you do not have access to this data' });
  }
};