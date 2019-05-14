const app = require('./server/app');
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Express server started on port ' + port));
