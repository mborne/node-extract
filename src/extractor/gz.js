const fs = require('fs');
const path = require('path');

const ExtractParams = require('../ExtractParams');
const execExtractor = require('../execExtractor');

/**
 * Extract .gz archives
 * @param {ExtractParams} params
 */
function gz(params){
    let targetPath = path.resolve(
        params.targetDir,
        path.basename(params.archivePath,'.gz')
    );
    fs.mkdirSync(params.targetDir, { recursive: true });
    /* stream gunzip stdout to the target file (no in-memory buffering) */
    let fd = fs.openSync(targetPath, 'w');
    try {
        execExtractor(params, 'gunzip', ['-c', '--', params.archivePath], {
            stdio: ['ignore', fd, 'ignore']
        });
    } catch (err) {
        /* do not leave an empty or partial file */
        fs.closeSync(fd);
        fs.unlinkSync(targetPath);
        throw err;
    }
    fs.closeSync(fd);
}

module.exports = gz;
