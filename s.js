var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var led = new five.Led(22);
    led.blink(500);
});