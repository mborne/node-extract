const fs = require('fs');
const path = require('path');

const debug = require('debug')('extract');

const ExtractParams = require('./src/ExtractParams');

const mapping = {
    '.7z': require('./src/extractor/7z'),
    '.zip': require('./src/extractor/unzip'),
    '.tar.bz2': require('./src/extractor/tar-bz2'),
    '.gz': require('./src/extractor/gz')
};


/**
 * Find extractor by extension
 * @param {string} archivePath
 * @return {Function}
 */
function findExtractor(archivePath){
    /* sort extensions by length (the longuest one is the best) */
    let extensions = Object.keys(mapping).sort(function(a,b){
        return b.length < a.length;
    });

    let bestExtension = null;
    extensions.forEach(function(extension){
        if ( archivePath.endsWith(extension) ){
            bestExtension = extension;
        }
    });
    if ( bestExtension === null ){
        throw new Error('No extractor found for '+archivePath);
    }
    debug(`found ${bestExtension} extractor for ${archivePath}`);
    return mapping[bestExtension];
}

/**
 * Extracts archives (7z, zip, bz2...)
 *
 * Note that it relies on system CLI tools
 *
 * @typedef {Object} options
 * @property {string} options.archivePath original path
 * @property {string} [options.targetPath] extraction path (parent dir)
 *
 * @returns {ExtractParams}
 */
async function extract(options){
    let params = new ExtractParams(options);

    /* find extractor */
    let extractor = findExtractor(params.archivePath);
    extractor(params);
    return params;
}

module.exports = extract;

