const assert = require('assert');

const fs = require('fs');

const extract = require('../index');

/**
 * Test extraction for an archive containing a README.txt file
 * @param {string} archivePath
 */
async function testExtract(archivePath){
    let targetDir  = '/tmp/test-extract';
    if ( fs.existsSync(targetDir) ){
        fs.rmSync(targetDir, { recursive: true, force: true });
    }

    await extract({
        archivePath: archivePath,
        targetDir: targetDir
    });

    let readmePath = targetDir+'/README.txt';
    assert.ok(fs.existsSync(readmePath),
        `testExtract(${archivePath},${targetDir}) - ${readmePath} not found`
    );

    let content = fs.readFileSync(readmePath,'utf-8');
    assert.ok(content.includes("this is a test archive"),
        `testExtract(${archivePath},${targetDir}) - expected content not found`
    );
}

module.exports = testExtract;
