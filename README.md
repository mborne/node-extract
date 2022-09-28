# node-extract

[![Node.js CI](https://github.com/mborne/node-extract/actions/workflows/node.js.yml/badge.svg)](https://github.com/mborne/node-extract/actions/workflows/node.js.yml)

## Description

Extract archives (7z, zip, bz2, gz,...) using system executables

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

## License

[MIT](LICENSE)
