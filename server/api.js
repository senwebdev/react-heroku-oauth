const request = require('superagent');

module.exports = {
  me
};

function me(accessToken) {
  return request
    .get('https://api.automatic.com/user/me/')
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json');
}
