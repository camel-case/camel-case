var express = require('express')

var app = express();

/* Serve all static files from public folder */
app.use(express.static('./client'));

/* Include routes */
require('./routes/routes')(app);

/* Declare port number & init server */
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('server listening on port 3000');
});
