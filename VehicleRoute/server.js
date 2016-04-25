var app = require('./app'),
 port = process.env.PORT || 5002;

app.listen(port, function() {
 console.log('server listening on port ' + port);
});