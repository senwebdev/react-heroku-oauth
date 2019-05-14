const { clientId, site, tokenPath } = require('../package.json').automatic;

module.exports = require('simple-oauth2')({
  clientID: process.env.HEROKU_CLIENT_ID || clientId,
  clientSecret: process.env.HEROKU_CLIENT_SECRET,
  site,
  tokenPath
});