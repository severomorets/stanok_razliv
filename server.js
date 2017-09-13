
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    WebSocket = require('ws'),

    MongoClient = require('mongodb').MongoClient,
    async = require("async"),
    ObjectId = require('mongodb').ObjectID;

RELE = new Object()
CRAN = new Object()
WATER = new Object()
USERS = new Array()
BTN = new Array()



global.Server = {
    valves:[],
    USERS:[],
    RELE:[],
    OPTIONS:{pulse:0,size:0},


}

deleteBuilds = function(id){
    for(var i=0;i<global.cache.options.builds.length;i++){
        if (id==global.cache.options.builds[i].id){
            global.cache.options.builds.splice(i,1)
            break;
        }
    }
}
setBuilds = function(id){
    for(var i=0;i<global.cache.options.builds.length;i++){
        if (id==global.cache.options.builds[i].id){

            global.Server.OPTIONS = global.cache.options.builds[i]

            break;
        }
    }
}
getValves = function(pin){
    for(var i=0;i<global.cache.options.valves.length;i++){
        if (pin==global.cache.options.valves[i].pin){
            return i
            //global.Server.OPTIONS = global.cache.options.builds[i]
            break;
        }
    }
}
async.series([
    function(callback){
        require('./app/http').createHttp(callback);
    },
    function(callback){
        require('./app/db').createDB(callback);
    },function(callback){
        require('./app/ws').createWS(callback);

    },function(callback){
        require('./app/arduino').createBoard(callback);

    }
],function (err,results) {
    for(var i = 0; i < results.length; i++)
    {
      console.log(results[i]);
    }
    // for(var i=0;i<global.Server.USERS.length;i++){
    //     global.Server.USERS.ws.send(JSON.stringify({startOptions:global.cache.options}));
    // }

})
    Change = function (id,option){
    for(var i in global.Server.USERS){
        global.Server.USERS[i].send(JSON.stringify({
            change:{
                CRAN:CRAN[id],
                option:option
            }
        }))
    }
    // global.Server.USERS
}
    SendEmit = function (id,method,option){

    }




global.cache = {}


process.on('uncaughtException', function (err)
{
    console.log('<- UNCAUGHT ERROR START ------------------------------------------------------------------------------>');
    console.log(new Date());
    console.log(err.message);
    console.log(err.stack);
    console.log('<- UNCAUGHT ERROR END -------------------------------------------------------------------------------->');
});
