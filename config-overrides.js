const path = require('path');

module.exports = {
    paths: function (paths, env) {        
        paths.appIndexJs = path.resolve(__dirname, "client/index.js");
        paths.appSrc = path.resolve(__dirname, "client");
        return paths;
    },
}