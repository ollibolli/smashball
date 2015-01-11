curl = require('curl-amd');
    curl.config({
        baseUrl: '../../../../main/js/',
        pluginPath: "../../src/curl/plugin",
        path : {
            test:'../test/js'
        }
    });

curl = global.curl = curl;
