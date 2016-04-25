var app = require('./app'),
 port = process.env.PORT || 5004;

app.listen(port, function() {
 console.log('server listening on port ' + port);
});