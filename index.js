var argv = require('optimist')
    .usage('Usage: $0 --path [string] --bundleName [string]')
    .demand(['path'])
    .demand(['bundleName']).argv,
    co = require('co'),
    fs = require('fs'),
    path = require('path');

function walkSync(currentDirPath, callback) {

    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat, name);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}
function checkChuncks(filePath, stat, name){

    if(filePath.match(new RegExp(argv.bundleName))){
        console.log(name);
    } else {
        var bundlePath = path.join(argv.path, argv.bundleName);
        fs.readFile(bundlePath, 'utf8', function (err, data) {
            if (err) throw err;
            var lastModifiedDate = new Date(stat.mtime);
            var checkedDate = new Date(new Date().getFullYear(), new Date().getMonth() - 2);
            if(data.match(new RegExp(name.replace(/.js.gz|.js/, '')))){
                console.log(name);
            } else if(lastModifiedDate.getMonth() >= checkedDate.getMonth()){
                console.log(name);
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }
}

var onerror = function onerror(err) { console.error(err.stack); };

co(function *(){
    walkSync(argv.path, checkChuncks);

}).catch(onerror);



