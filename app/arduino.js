exports.createBoard = function(callback) {
    var five = require("johnny-five");
    var board = new five.Board();
    board.on("ready", function () {


        function changePin($this, id) {

            $this.digitalRead(CRAN[id].pin, function (value) {


                if (value > 0) {

                    CRAN[id].pulse++
                    CRAN[id].pulseAll++
                    var option = null
                    if (CRAN[id].maxPulse){
                        if (CRAN[id].pulse>CRAN[id].maxPulse){
                            RELE[id].off()
                            CRAN[id].reley = false
                            CRAN[id].pulse = 0
                            CRAN[id].maxPulse = false
                            option = {stopProcess:true}
                        }

                    }
                    Change(id,option)

                }

            });

        }
        for (var id in CRAN) {
            if (CRAN[id].init) {
                this.pinMode(CRAN[id].pin, five.Pin.INPUT);
                RELE[id] = new five.Relay(CRAN[id].releyPin);
                console.log("INIT pin " + CRAN[id].pin)
                changePin(this, id)
            }
        }
        // for (var i = 0; i < global.cache.options.valves.length; i++) {
        //
        //     if (global.cache.options.valves[i].init) {
        //         this.pinMode(global.cache.options.valves[i].pin, five.Pin.INPUT);
        //
        //         global.Server.RELE[i] = new five.Relay(global.cache.options.valves[i].releyPin);
        //         changePin(this, i)
        //         console.log("INIT pin " + global.cache.options.valves[i].pin)
        //     }
        //
        // }
        callback(null, "BOARD init")
    });

}
