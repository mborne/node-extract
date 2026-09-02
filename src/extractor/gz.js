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
    try {
        const out = execFileSync('gunzip', ['-c', params.archivePath]);
        fs.writeFileSync(targetPath, out);
    } catch (err) {
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = gz;

