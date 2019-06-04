const expect = require("chai").expect;

const fs = require('fs');
const shell = require('shelljs');

const extract = require('../index');

/**
 * Test extraction for an archive containing a README.txt file
 * @param {string} archivePath
 */
async function testExtract(archivePath){
    let targetDir  = '/tmp/test-extract';
    if ( fs.existsSync(targetDir) ){
        shell.rm('-rf',targetDir);
    }

    await extract({
        archivePath: archivePath,
        targetDir: targetDir
    });

    let readmePath = targetDir+'/README.txt';
    expect(fs.existsSync(readmePath)).to.equal(true,
        `testExtract(${archivePath},${targetDir}) - ${readmePath} not found`
    );

    let content = fs.readFileSync(readmePath,'utf-8');
    expect(content).to.contain(
        "this is a test archive",
        `testExtract(${archivePath},${targetDir}) - expected content not found`
    );
}

module.exports = testExtract;
