const jwt = require('jsonwebtoken');
const secrets = require('../../auth/config/secrets.js')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // const cert = fs.readFileSync('public.pem')
    jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken) => {  //if type and secret match the type and secret on the token then the request is allowed to proceed
      console.log("This is req.headers", req.headers)
      console.log("This is decoded token",decodedToken)
      if (err) {
        res.status(403).json({message: "your user type does not have access to this"})
      } else {
        if(decodedToken.userType == '1'){
        req.decodedToken = decodedToken
        next()
        } else {
          res.status(403).json({message: "your user type does not have access to this"})
        }
      }

    })
 
};