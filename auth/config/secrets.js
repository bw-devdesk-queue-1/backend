// the secrets will be safely stored in an environment variable, these are placeholders for development.
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'make sure this stays between us',
  };