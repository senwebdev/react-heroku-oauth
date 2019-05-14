const express = require('express');
const request = require('superagent');
const path = require('path');
var cors = require('cors');
const app = express();

module.exports = app;

const {
  session,
  verifyToken
} = require('./middleware');

// Enable sessions
app.use(session());
app.use(cors());

// Import build directory to server
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.post('/user', getUserInfo);

async function getUserInfo(req, res){
  var code = req.query.code;
  var secret = req.query.secret;
  var access_token = ''

  const token = await request
    .post('https://id.heroku.com/oauth/token?grant_type=authorization_code&code='+code+'&client_secret='+secret)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.heroku+json; version=3')

  access_token = token.body.access_token

  try{
    const result = await request
    .get('https://api.heroku.com/account')
    .set({'Content-Type': 'application/json','Accept': 'application/vnd.heroku+json; version=3','Authorization': 'Bearer ' + access_token})
    console.log("Full Name : " + result.body.name + ", " + "Email : " + result.body.email + ", " + "Token : " + access_token);
    res.status(201).json({status:201, "msg": "Get User Information", "Name":result.body.name, "Email":result.body.email, "Token":access_token});
  }
  catch(e){
    console.log(e);
  }
}
