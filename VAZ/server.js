

five = require("johnny-five");
var board = new five.Board();
Pin = {}
Vaz  = require('./method.js');

board.on("ready", function() {
    
  
Pin  = require('./config.js').Pin();
Vaz.initRelay()

});


function sendClient(){
  for (var key in clients) {
    var val = {}
    for(var numPin in Pin){
      val[numPin] = {val:Pin[numPin].val,name:Pin[numPin].name,type:Pin[numPin].type,attr:Pin[numPin].attr}
    }
    clients[key].send(JSON.stringify(val));
  }
}







var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = [];

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});

webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;

  console.log("новое соединение " + id);
  sendClient()
  ws.on('message', function(message) {
    var data  = JSON.parse(message)
    console.log(data)
   if (data.hasOwnProperty("val"))
   {
    if (data.val==1)
    {
         Pin[data.pin].pin.high()
         console.log("ON")
    }
    if (data.val==0)
    {
        Pin[data.pin].pin.low()
        console.log("OFF")
    }
   }
    if (data.hasOwnProperty("method"))
   {
    if (Vaz.hasOwnProperty(data.method))
    {
        Vaz[data.method](data.data)
    }else
    {
        console.log("NO METHOD")
    }
    
   }
   
   
sendClient()

  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});

