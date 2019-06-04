const testExtract = require('./testExtract');

describe("Test zip extractor", function () {
    it("should work for sample.zip", async function () {
        let archivePath = __dirname+'/data/sample.zip';
        await testExtract(archivePath);
    });
});
