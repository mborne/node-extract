const { execFileSync } = require('child_process');
const shell = require('shelljs');
const debug = require('debug')('extract');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .tar.bz2 archives
 * @param {ExtractParams} params
 */
function bz2(params){
    /*
    * check for tar
    */
    if (!shell.which('tar')) {
        throw 'tar is missing to extract '+params.archivePath;
    }
    shell.mkdir('-p',params.targetDir);
    debug('tar xf %s -C %s', params.archivePath, params.targetDir);
    try {
        execFileSync('tar', ['xf', params.archivePath, '-C', params.targetDir], { stdio: 'ignore' });
    } catch (err) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = bz2;

