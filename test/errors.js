const assert = require('assert');

const fs = require('fs');
const os = require('os');
const path = require('path');

const extract = require('../index');

describe("Test extractor errors", function () {
    it("should report error for missing files", async function () {
        let archivePath = __dirname+'/data/not-found.7z';

        await assert.rejects(extract({
            archivePath: archivePath
        }), /file not found/);
    });

    it("should report error missing extractor", async function () {
        let archivePath = __dirname+'/data/sample.xyz';

        await assert.rejects(extract({
            archivePath: archivePath
        }), /No extractor found/);
    });

    describe("with missing executables", function () {
        let originalPath;
        let targetDir;

        beforeEach(function(){
            originalPath = process.env.PATH;
            process.env.PATH = '';
            targetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'extract-errors-'));
        });

        afterEach(function(){
            process.env.PATH = originalPath;
            fs.rmSync(targetDir, { recursive: true, force: true });
        });

        it("should report error for missing unzip", async function () {
            await assert.rejects(extract({
                archivePath: __dirname+'/data/sample.zip',
                targetDir: targetDir
            }), /unzip is missing/);
        });

        it("should report error for missing gunzip without leaving a file", async function () {
            await assert.rejects(extract({
                archivePath: __dirname+'/data/README.txt.gz',
                targetDir: targetDir
            }), /gunzip is missing/);
            assert.deepStrictEqual(fs.readdirSync(targetDir), []);
        });
    });
});
