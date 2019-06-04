const shell = require('shelljs');
const debug = require('debug')('extract');
const path = require('path');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .zip archives
 * @param {ExtractParams} params
 */
function gz(params){
    if (!shell.which('gunzip')) {
        throw 'gunzip is missing to extract '+params.archivePath;
    }

    let targetPath = path.resolve(
        params.targetDir,
        path.basename(params.archivePath,'.gz')
    );
    shell.mkdir('-p',params.targetDir);
    var command = 'gunzip < '+params.archivePath+' > '+targetPath;
    debug(command);
    if (shell.exec(command,{silent: true}).code !== 0) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = gz;

