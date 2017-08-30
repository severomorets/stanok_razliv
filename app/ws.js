exports.createWS = function(callback) {
    var wss = new WebSocket.Server({ port: 7001 });
    var t = 0;
    wss.on('connection', function connection(ws) {

        console.log("CONNECT")
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var data = JSON.parse(message)
            if (data.hasOwnProperty('saveRedWATER')){
                WATER[data.saveRedWATER._id] = data.saveRedWATER
                data.saveRedWATER._id = ObjectId(data.saveRedWATER._id)
                global.db.water.update({_id:ObjectId(data.saveRedWATER._id)},{$set:data.saveRedWATER})
            }
            if (data.hasOwnProperty('resetActivPulse')){
                CRAN[data.resetActivPulse._id].pulse = 0
                Change(CRAN[data.resetActivPulse._id]._id)
            }
            if (data.hasOwnProperty('togleCran')){
                if (data.togleCran.RELE==1){
                    CRAN[data.togleCran._id].reley = true
                    RELE[data.togleCran._id].on()
                }
                if (data.togleCran.RELE==0){
                    CRAN[data.togleCran._id].reley = false
                    RELE[data.togleCran._id].off()
                }
                Change(CRAN[data.togleCran._id]._id)
            }
            if (data.hasOwnProperty('createWATER')){
                var water = {
                    name : data.createWATER.name,
                    size : []
                }

                global.db.water.save(water,function(err,data){
                    console.log(err)
                    WATER[data.ops[0]._id] = data.ops[0]
                    ws.send(JSON.stringify({startOptions:{
                        CRAN:CRAN,
                        WATER:WATER
                    }}));
                })
            }
            if (data.hasOwnProperty('resetPulse')){
                CRAN[data.resetPulse._id].pulse = 0
                Change(CRAN[data.resetPulse._id]._id)

            }
            if (data.hasOwnProperty('startProcess')){
                CRAN[data.startProcess.cranID].pulse = 0
                CRAN[data.startProcess.cranID].maxPulse = data.startProcess.maxpulse
                RELE[data.startProcess.cranID].on()
                CRAN[data.startProcess.cranID].reley = true
                Change(data.startProcess.cranID)
            }
            if (data.hasOwnProperty('stopProcess')){

                CRAN[data.stopProcess.cranID].maxPulse = false
                RELE[data.stopProcess.cranID].off()
                CRAN[data.stopProcess.cranID].reley = false
                Change(data.stopProcess.cranID)
            }
















            if (data.hasOwnProperty('saveBuilds')){

                var builds = {
                    id:new ObjectId,
                    name:data.saveBuilds.name,
                    size : parseInt(data.saveBuilds.size),
                    pulse : 0,
                }
                global.cache.options.builds.push(builds)
                global.db.init.update({_id:ObjectId('591f3198aa230887d1c012ac')},{$push:{builds:builds}})
                ws.send(JSON.stringify({saveBuilds:builds}));
            }
            if (data.hasOwnProperty('deleteBuild')){

                deleteBuilds(data.deleteBuild.id)
                global.db.init.update({_id:ObjectId('591f3198aa230887d1c012ac')},{$pull:{builds:{id:ObjectId(data.deleteBuild.id)}}})
            }
            if (data.hasOwnProperty('setBuild')){

                setBuilds(data.setBuild)
                console.log(global.Server.OPTIONS)
            }
            if (data.hasOwnProperty('startValve')){

                console.log(global.cache.options.valves[getValves(data.startValve.pin)])
                global.cache.options.valves[getValves(data.startValve.pin)].pulse = 0
                global.Server.RELE[getValves(data.startValve.pin)].on()
                global.cache.options.valves[getValves(data.startValve.pin)].reley = true
                console.log(data.startValve.pin+"  ON")
            }

            if (data.hasOwnProperty('calibration')){
                if (data.calibration.val==0){
                    global.Server.RELE[getValves(data.calibration.pin)].off()
                }
                if (data.calibration.val==1){
                    global.Server.RELE[getValves(data.calibration.pin)].on()
                }

            }



        });
        ws.on('close', function close() {
            console.log('disconnected');
            delete global.Server.USERS[ws.id];
        });
        // ws.send(JSON.stringify());

        ws.id = t

        global.Server.USERS[t] = ws
        ws.send(JSON.stringify({startOptions:{
            CRAN:CRAN,
            WATER:WATER
        }}));
        t++;

    });
    callback(null,"SOCKETS init")
};