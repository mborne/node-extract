const { execFileSync } = require('child_process');
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

    /* Extract 7z file */
    debug('7z x -y %s -o%s', params.archivePath, params.targetDir);
    try {
        execFileSync('7z', ['x', '-y', params.archivePath, '-o' + params.targetDir], { stdio: 'ignore' });
    } catch (err) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = extractor7z;
