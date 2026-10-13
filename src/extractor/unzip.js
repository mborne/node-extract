const fs = require('fs');

const ExtractParams = require('../ExtractParams');
const execExtractor = require('../execExtractor');

/**
 * Extract .zip archives
 * @param {ExtractParams} params
 */
function unzip(params){
    fs.mkdirSync(params.targetDir, { recursive: true });
    execExtractor(params, 'unzip', ['-o', '-d', params.targetDir, params.archivePath]);
}

module.exports = unzip;
