# node-extract

[![Node.js CI](https://github.com/mborne/node-extract/actions/workflows/node.js.yml/badge.svg)](https://github.com/mborne/node-extract/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/mborne/node-extract/badge.svg?branch=master)](https://coveralls.io/github/mborne/node-extract?branch=master)

## Description

Extract archives (7z, zip, bz2, gz,...) using system executables

> [!WARNING]
> This library is **not actively maintained**. It was used by a previous Node.js version of [mborne/postgis-integration](https://github.com/mborne/postgis-integration) which has been ported to Python (see [mborne/postgis-integration#18](https://github.com/mborne/postgis-integration/issues/18)).

## Usage

```js
const extract = require('@mborne/extract');

await extract({
    archivePath: '/path/to/archive.zip'
});
```

## Options

| Name          | Required? | Description                     |     Default      |
| ------------- | :-------: | ------------------------------- | :--------------: |
| `archivePath` |    YES    | Archive path                    |        NA        |
| `targetDir`   |    NO     | Target directory for extraction | Parent directory |

## Security

This library delegates extraction to system executables (`unzip`, `7z`, `tar`, `gunzip`) and is intended to be used with **controlled paths and trusted archives**:

- Protection against path traversal ("zip slip"), malicious symlinks,... relies entirely on the system executables and their versions.
- There is no protection against decompression bombs (no size limit, no timeout).

If you have to process archives from untrusted sources, check them and/or run the extraction in a sandbox (container, dedicated user, quotas,...).

## License

[MIT](LICENSE)
