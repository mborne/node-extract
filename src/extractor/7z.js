const shell = require('shelljs');
const debug = require('debug')('extract');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .7z archives
 * @param {ExtractParams} params
 */
function extractor7z(params){
    /*
    * check for 7z
    */
    if (!shell.which('7z')) {
        throw '7z is missing to extract '+params.archivePath;
    }

    /* Extract zip file */
    var command = '7z x -y '+params.archivePath+' -o'+params.targetDir;
    debug(command);
    if (shell.exec(command,{silent: true}).code !== 0) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = extractor7z;
