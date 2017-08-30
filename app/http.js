exports.createHttp = function(callback) {


    extensions = {
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "application/javascript",
        ".png" : "image/png",
        ".gif" : "image/gif",
        ".jpg" : "image/jpeg"
    };

    function getFile(filePath,res,page404,mimeType){
        fs.exists(filePath,function(exists){
            if(exists){
                fs.readFile(filePath,function(err,contents){
                    if(!err){
                        res.writeHead(200,{
                            "Content-type" : mimeType,
                            "Content-Length" : contents.length
                        });
                        res.end(contents);
                    } else {
                        console.dir(err);
                    };
                });
            } else {
                fs.readFile(page404,function(err,contents){
                    if(!err){
                        //send the contents with a 404/not found header
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end(contents);
                    } else {
                        console.dir(err);
                    };
                });
            };
        });
    };

    function requestHandler(req, res) {
        var
            fileName = path.basename(req.url) || 'index.html',
            ext = path.extname(fileName),
            localFolder = __dirname + '/public/',
            page404 = localFolder + '404.html';

        if(!extensions[ext]){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
        };
        getFile((localFolder + fileName),res,page404,extensions[ext]);
    };
    http.createServer(requestHandler).listen(3000);
    callback(null,"SERVER 3000 INIT")
};