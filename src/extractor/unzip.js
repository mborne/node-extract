const { execFileSync } = require('child_process');
const shell = require('shelljs');
const debug = require('debug')('extract');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .zip archives
 * @param {ExtractParams} params
 */
function unzip(params){
    /*
    * check for unzip
    */
    if (!shell.which('unzip')) {
        throw 'unzip is missing to extract '+params.archivePath;
    }
    shell.mkdir('-p', params.targetDir);
    debug('unzip -o -d %s %s', params.targetDir, params.archivePath);
    try {
        execFileSync('unzip', ['-o', '-d', params.targetDir, params.archivePath], { stdio: 'ignore' });
    } catch (err) {
        throw 'Fail to extract '+params.archivePath;
    }
}

module.exports = unzip;




