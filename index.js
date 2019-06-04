const fs = require('fs');
const path = require('path');

const debug = require('debug')('extract');

const mapping = {
    '.7z': require('./extractor/7z'),
    '.zip': require('./extractor/unzip'),
    '.tar.bz2': require('./extractor/tar-bz2'),
    '.gz': require('./extractor/gz')
};

/**
 * Extraction result
 * @typedef {Object} ExtractResult
 * @property {string} archivePath original path
 * @property {string} targetPath extraction path (parent dir)
 */


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
    debug(`found ${bestExtension} extractor for ${archivePath}`);
    return bestExtension != null ? mapping[bestExtension] : null;
}

/**
 * Extracts archive (7z, zip and bz2) in parent directory
 *
 * Note that it relies on system CLI tools
 *
 * @param {string} archivePath
 *
 * @returns {ExtractResult}
 */
async function extract(archivePath){
    if ( ! fs.existsSync(archivePath) ){
        throw new Error("file not found : "+archivePath);
    }

    let extractor = findExtractor(archivePath);
    if ( extractor === null ){
        throw new Error('No extractor found for '+archivePath);
    }
    extractor(archivePath);
    return {
        archivePath: archivePath,
        targetPath: path.dirname(archivePath)
    }
}

module.exports = extract;

