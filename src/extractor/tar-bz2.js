const shell = require('shelljs');
const debug = require('debug')('extract');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .tar.bz2 archives
 * @param {ExtractParams} params
 */
function bz2(params){
    /*
    * check for 7z
    */
    if (!shell.which('tar')) {
        throw 'tar is missing to extract '+params.archivePath;
    }
    var command = 'tar xf '+params.archivePath+' -C '+params.targetDir;
    debug(command);
    if (shell.exec(command,{silent: true}).code !== 0) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = bz2;

