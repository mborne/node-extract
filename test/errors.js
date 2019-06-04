const expect = require("chai").expect;

const fs = require('fs');
const shell = require('shelljs');

const extract = require('../index');

describe("Test extractor errors", function () {
    it("should report error for missing files", async function () {
        let archivePath = __dirname+'/data/not-found.7z';

        var thrown = false;
        try {
            await extract(archivePath);
        }catch(err){
            thrown = true;
        }
        expect(thrown).to.equal(true,"error expected");
    });

    it("should report error missing extractor", async function () {
        let archivePath = __dirname+'/data/sample.xyz';

        var thrown = false;
        try {
            await extract(archivePath);
        }catch(err){
            thrown = true;
        }
        expect(thrown).to.equal(true,"error expected");
    });
});
