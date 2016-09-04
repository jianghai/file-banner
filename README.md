# file-banner

Automatic add banner for your files.

[![npm package](https://img.shields.io/npm/v/file-banner.svg)](https://www.npmjs.org/package/file-banner) 
[![NPM downloads](http://img.shields.io/npm/dm/file-banner.svg)](https://npmjs.org/package/file-banner)

## Installation

```sh
npm install file-banner --save-dev
```

## Usage

Step1: Add `.banner` in the same directory of `package.json`, such as:

```js
/**
 * Copyright 2016-present, jianghai.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule <%= file %>
 */
```

available variables: 

- file: the current file path

Step2: Register script in the package.json

```js
{
  "scripts": {
    "banner": "file-banner src --ignore __tests__",
  }
}
```

## Docs

Use `file-banner help` in the command line.

> [--ignore `<RegExp>`], the RegExp is the parameter of `new RegExp` and test target is the path of file which exclude `rootdir`

## License

[BSD licensed](./LICENSE)