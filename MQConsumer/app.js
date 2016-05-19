var amqp = require('amqp');
var guid = require('guid').raw();

var count = 1;
var connection = amqp.createConnection({ url: 'amqp://fpapccau:DhwJdq_bPJKOvJVnoPWmMgPQMEzyNQ-0@spotted-monkey.rmq.cloudamqp.com:5672/fpapccau'});
connection.on('ready', function () {
  console.log('ready');
  var exchange = connection.exchange('ToTuBusPos');
//   var queue = connection.queue("MyTmpQue-" + guid , {
//                             durable: false,
//                             autoDelete: false,
//                             exclusive: false
//                         });
  
    var sendMessage = function(exchange, payload) {
      console.log('about to publish')
      var encoded_payload = JSON.stringify(payload);
      exchange.publish('', encoded_payload, {})
      console.log('pub');
    }

    // queue.bind(exchange, ''); 
    // console.log('bind');
    // queue.subscribe(function (message) {
    //   var encoded_payload = unescape(message.data)
    //   var payload = JSON.parse(encoded_payload)
    //   console.log('Recieved a message:')
    //   console.log(payload)
    // })
    // console.log('sub');

    setInterval( function() {    
      var test_message = 'TEST '+count
      sendMessage(exchange, test_message)  
      count += 1;
    }, 2000) 
});
