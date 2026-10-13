const fs = require('fs');

const ExtractParams = require('../ExtractParams');
const execExtractor = require('../execExtractor');

/**
 * Extract .tar.bz2 archives
 * @param {ExtractParams} params
 */
function bz2(params){
    fs.mkdirSync(params.targetDir, { recursive: true });
    execExtractor(params, 'tar', ['xf', params.archivePath, '-C', params.targetDir]);
}

module.exports = bz2;
