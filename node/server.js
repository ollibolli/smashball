
var port = 3000;
startHttpServer(port);
console.log('Server started at localhost:', port);

function startHttpServer(port){
	var express = require('express');
	var app = express();
	var path = require('path');
    app
	.use(express.static(path.normalize(process.cwd()+ "/main")))
	.use(express.directory(path.normalize(process.cwd() + "/main")))


    app.listen(port);
    return app;
}

