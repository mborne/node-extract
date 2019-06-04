const shell = require('shelljs');
const debug = require('debug')('extract');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .zip archives
 * @param {ExtractParams} params
 */
function unzip(params){
    /*
    * check for 7z
    */
    if (!shell.which('unzip')) {
        throw 'unzip is missing to extract '+params.archivePath;
    }
    var command = 'unzip -o -d '+params.targetDir+' '+params.archivePath;
    debug(command);
    if (shell.exec(command,{silent: true}).code !== 0) {
        throw 'Fail to extract '+params.archivePath;
    }
}

module.exports = unzip;




