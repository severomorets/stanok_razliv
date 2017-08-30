exports.createDB = function(callback) {

    global.db = {};


    MongoClient.connect('mongodb://localhost:27017', function(err, db) {
        console.log(err)
        db = db.db('stanok')
        global.db = db
        global.db.init = db.collection('init')
        global.db.cran = db.collection('cran')
        global.db.water = db.collection('water')
        async.series([
            function(cb){
                global.db.init.findOne({},function(err, data) {
                    if (err) {
                        console.log('[ALERT] global.db.init')
                        console.error(err);
                    } else {
                        global.cache.options = data
                        cb(null,"DB INIT init")
                    }
                })
            },function(cb){
                global.db.cran.find({}).toArray(function(err, data) {
                    if (err) {
                        console.log('[ALERT] global.db.init')
                        console.error(err);
                    } else {
                        for(var i=0;i<data.length;i++){
                            CRAN[data[i]._id] = data[i]
                        }

                        cb(null,"DB INIT cran")
                    }
                })
            },function(cb){
                global.db.water.find({}).toArray(function(err, data) {
                    if (err) {
                        console.log('[ALERT] global.db.init')
                        console.error(err);
                    } else {
                        for(var i=0;i<data.length;i++){
                            WATER[data[i]._id] = data[i]
                        }

                        cb(null,"DB INIT water")
                    }
                })
            }
        ],function (err,results) {
            for(var i = 0; i < results.length; i++)
            {
                console.log(results[i]);
            }
            callback(null,"DB INIT")
        })


    });
};