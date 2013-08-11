
startHttpServer(3000);


function startHttpServer(port){
	var express = require('express');
	var app = express();
	var path = require('path');
    app
	.use(express.static(path.normalize(process.cwd()+ "/main")))
	.use(express.directory(path.normalize(process.cwd() + "/../main")))

    console.log(path.normalize(__dirname + "/../main"))
    console.log('Starting local Http server on Port :'+ port);
    app.listen(port);
    return app;
}

