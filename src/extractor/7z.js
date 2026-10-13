const ExtractParams = require('../ExtractParams');
const execExtractor = require('../execExtractor');

/**
 * Extract .7z archives
 * @param {ExtractParams} params
 */
function extractor7z(params){
    execExtractor(params, '7z', ['x', '-y', params.archivePath, '-o' + params.targetDir]);
}

module.exports = extractor7z;
