module.exports = {
    session,
    verifyToken
  }
  
  function session() {
    return require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    });
  }
  
  function verifyToken(req, res, next) {
    const tokenAvailable = req.session && req.session.token;
    if (!tokenAvailable) {
      res.redirect('/');
    } else {
      next();
    }
}