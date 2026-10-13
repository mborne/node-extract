const { execFileSync } = require('child_process');
const debug = require('debug')('extract');

const ExtractParams = require('./ExtractParams');

/**
 * Run a system executable to extract an archive
 *
 * @param {ExtractParams} params
 * @param {string} command executable name (ex : "unzip")
 * @param {string[]} args arguments (no shell expansion)
 * @param {Object} [options] execFileSync options
 */
function execExtractor(params, command, args, options){
    debug('%s %o', command, args);
    try {
        execFileSync(command, args, Object.assign({ stdio: 'ignore' }, options));
    } catch (err) {
        if ( err.code === 'ENOENT' ){
            throw new Error(command+' is missing to extract '+params.archivePath);
        }
        throw new Error('Fail to extract '+params.archivePath);
    }
}

module.exports = execExtractor;
