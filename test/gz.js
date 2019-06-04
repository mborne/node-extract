const testExtract = require('./testExtract');

describe("Test gz extractor", function () {
    it("should work for sample.gz", async function () {
        let archivePath = __dirname+'/data/README.txt.gz';
        await testExtract(archivePath);
    });
});
