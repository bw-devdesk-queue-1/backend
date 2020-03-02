const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const type = 0 //sets the desired result for type
  const secret = process.env.JWT_SECRET || "make sure this stays between us" // secret on the token

    jwt.verify(type, secret, (err, decodedToken) => {  //if type and secret match the type and secret on the token then the request is allowed to proceed
      console.log("This is req.headers", req.headers)
      if (err) {
        res.status(403).json({message: "your user type does not ahve access to this"})
      } else {
        req.decodedToken = decodedToken

        next()
      }

    })
 
};