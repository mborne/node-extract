const testExtract = require('./testExtract');

describe("Test tar.bz2 extractor", function () {
    it("should work for sample.tar.bz2", async function () {
        let archivePath = __dirname+'/data/sample.tar.bz2';
        await testExtract(archivePath);
    });
});
