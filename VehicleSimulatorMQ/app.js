var amqp = require('amqp');
var guid = require('guid');

var count = 1;
var connection = amqp.createConnection({ url: ''});
connection.on('ready', function () {
  var exchange = connection.exchange('ToTuBusPos');
  var queue = connection.queue("MyTmpQue-" + guid.raw(), {
                            durable: false,
                            autoDelete: false,
                            exclusive: false
                        });
  
    var sendMessage = function(exchange, payload) {
      console.log('about to publish')
      var encoded_payload = JSON.stringify(payload);
      exchange.publish('', encoded_payload, {})
    }

    queue.bind(exchange, ''); 
    queue.subscribe(function (message) {
      var encoded_payload = unescape(message.data)
      var payload = JSON.parse(encoded_payload)
      console.log('Recieved a message:')
      console.log(payload)
    })

    setInterval( function() {    
      var test_message = 'TEST '+count
      sendMessage(exchange, test_message)  
      count += 1;
    }, 2000) 
});
