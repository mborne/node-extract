const expect = require("chai").expect;

const fs = require('fs');
const shell = require('shelljs');

const extract = require('../index');

describe("Test tar.bz2 extractor", function () {
    it("should work for sample.tar.bz2", async function () {
        let archivePath = __dirname+'/data/sample.tar.bz2';

        let targetPath  = __dirname+'/data/sample';
        if ( fs.existsSync(targetPath) ){
            shell.rm('-rf',targetPath);
        }

        await extract({
            archivePath: archivePath
        });

        let readmePath = targetPath+'/README.txt';
        expect(fs.existsSync(readmePath)).to.equal(true);

        let content = fs.readFileSync(readmePath,'utf-8');
        expect(content).to.contain("this is a test archive");
    });
});
