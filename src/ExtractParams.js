const fs = require('fs');
const path = require('path');

/**
 * Extraction parameters
 */
class ExtractParams {

    constructor(options){
        /* check option archivePath */
        if ( typeof options.archivePath === 'undefined' ){
            throw new Error("archivePath option is required");
        }
        if ( ! fs.existsSync(options.archivePath) ){
            throw new Error("file not found : "+options.archivePath);
        }
        this.archivePath = options.archivePath;

         /* handle optional option targetPath */
        this.targetDir = ( typeof options.targetDir !== 'undefined' )?
            options.targetDir : path.dirname(this.archivePath)
        ;
    }

}

module.exports = ExtractParams;
