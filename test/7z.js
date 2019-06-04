const testExtract = require('./testExtract');

describe("Test 7z extractor", function () {
    it("should work for sample.7z", async function () {
        let archivePath = __dirname+'/data/sample.7z';
        await testExtract(archivePath);
    });
});
