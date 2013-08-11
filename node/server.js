
startHttpServer(3000);


function startHttpServer(port){
	var express = require('express');
	var app = express();
	var path = require('path');
    app
	.use(express.static(path.normalize(process.cwd()+ "/main")))
	.use(express.directory(path.normalize(process.cwd() + "/../main")))

    app.listen(port);
    return app;
}

