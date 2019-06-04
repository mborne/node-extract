const expect = require("chai").expect;

const fs = require('fs');
const shell = require('shelljs');

const extract = require('../index');

describe("Test zip extractor", function () {
    it("should work for sample.zip", async function () {
        let archivePath = __dirname+'/data/sample.zip';

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
