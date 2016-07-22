var express = require('express');
var auth = require('./routes/authRoute.js');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json())
/* Serve all static files from public folder */
app.use(express.static('./client'));

// route for signup to db
app.use('/auth', auth);

/* Include routes */
require('./routes/routes')(app);

/* Declare port number & init server */
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('server listening on port 3000');
});
