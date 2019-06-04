const expect = require("chai").expect;

const fs = require('fs');
const shell = require('shelljs');

const extract = require('../index');

describe("Test gz extractor", function () {
    it("should work for sample.gz", async function () {
        let archivePath = __dirname+'/data/README.txt.gz';

        let targetPath  = __dirname+'/data/README.txt';
        if ( fs.existsSync(targetPath) ){
            fs.unlinkSync(targetPath);
        }

        await extract({
            archivePath: archivePath
        });

        expect(fs.existsSync(targetPath)).to.equal(true);

        let content = fs.readFileSync(targetPath,'utf-8');
        expect(content).to.contain("this is a test archive");
    });
});
