const expect = require("chai").expect;

const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const shell = require('shelljs');

const extract = require('../index');

/*
 * file name with shell metacharacters and a leading dash
 * (would be interpreted as an option by unzip, 7z, tar...)
 */
const EVIL_NAME = '-o a b;touch pwned1;$(touch pwned2);`touch pwned3`';
const EVIL_TARGET = '-t out dir;touch pwned4';

describe("Test extractor with untrusted paths", function () {
    let originalCwd;
    let workDir;

    beforeEach(function(){
        originalCwd = process.cwd();
        workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'extract-security-'));
        /* injected commands would run in the current directory */
        process.chdir(workDir);
    });

    afterEach(function(){
        process.chdir(originalCwd);
        shell.rm('-rf', workDir);
    });

    function expectNoInjection(){
        const files = fs.readdirSync(workDir).filter(function(name){
            return name.startsWith('pwned');
        });
        expect(files).to.deep.equal([], 'shell injection detected');
    }

    const samples = {
        '.zip': 'sample.zip',
        '.7z': 'sample.7z',
        '.tar.bz2': 'sample.tar.bz2',
        '.gz': 'README.txt.gz'
    };

    Object.keys(samples).forEach(function(extension){
        it(`should safely extract ${extension} with untrusted paths`, async function () {
            if ( extension === '.7z' && ! shell.which('7z') ){
                this.skip();
            }
            const archivePath = EVIL_NAME + extension;
            fs.copyFileSync(
                path.join(__dirname, 'data', samples[extension]),
                path.join(workDir, archivePath)
            );

            /* relative paths to check that they can't be read as options */
            await extract({
                archivePath: archivePath,
                targetDir: EVIL_TARGET
            });

            const readmePath = extension === '.gz' ?
                path.join(workDir, EVIL_TARGET, EVIL_NAME) :
                path.join(workDir, EVIL_TARGET, 'README.txt')
            ;
            expect(fs.readFileSync(readmePath, 'utf-8')).to.contain("this is a test archive");
            expectNoInjection();
        });
    });

    it("should extract large .gz files (larger than child_process maxBuffer)", async function () {
        const size = 8 * 1024 * 1024;
        const archivePath = path.join(workDir, 'large.bin.gz');
        fs.writeFileSync(archivePath, zlib.gzipSync(Buffer.alloc(size, 'a')));

        await extract({
            archivePath: archivePath
        });

        expect(fs.statSync(path.join(workDir, 'large.bin')).size).to.equal(size);
    });
});
