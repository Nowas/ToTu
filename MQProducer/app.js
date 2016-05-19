var amqp = require('amqp');

var count = 1;
var connection = amqp.createConnection({ url: require('./lib/mqconf.js').connStr});
connection.on('ready', function () {
  console.log('ready');
  var exchange = connection.exchange('ToTuBusPos');

    var sendMessage = function(exchange, payload) {
      console.log('about to publish')
      var encoded_payload = JSON.stringify(payload);
      exchange.publish('', encoded_payload, {})
      console.log('pub');
    }

    setInterval( function() {    
      var test_message = 'TEST '+count
      sendMessage(exchange, test_message)  
      count += 1;
    }, 2000) 
});
