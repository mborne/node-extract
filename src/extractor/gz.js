const { execFileSync } = require('child_process');
const fs = require('fs');
const shell = require('shelljs');
const debug = require('debug')('extract');
const path = require('path');

const ExtractParams = require('../ExtractParams');

/**
 * Extract .gz archives
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
    debug('gunzip -c %s > %s', params.archivePath, targetPath);
    /* stream gunzip stdout to the target file (no in-memory buffering) */
    let fd = fs.openSync(targetPath, 'w');
    try {
        execFileSync('gunzip', ['-c', '--', params.archivePath], {
            stdio: ['ignore', fd, 'ignore']
        });
    } catch (err) {
        throw new Error('Fail to extract '+params.archivePath);
    } finally {
        fs.closeSync(fd);
    }
}

module.exports = gz;

