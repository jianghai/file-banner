/**
 * Copyright 2016-present, jianghai.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import fs from 'fs'
import path from 'path'
import template from 'lodash/template'
import colors from 'colors'

export default class {

  constructor(options) {
    this.options = options
    const { root, ignore } = this.options
    if (!root) return this.error('No rootdir provided, use `file-banner rootdir` instead.')
    if (ignore) {
      this.ignore = new RegExp(ignore, 'g')
    }
    try {
      this.banner = template(fs.readFileSync(this.BANNER, 'utf8'))
      this.readDir(root)
    } catch(e) {
      this.error(e.message)
    }
  }

  BANNER = '.banner'

  error(msg) {
    console.log(colors.red(msg))
  }

  readDir(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      file = path.join(dir, file)
      if (this.ignore && this.isIgnored(file)) return
      const stats = fs.statSync(file)
      if (stats.isDirectory()) {
        this.readDir(file)
      } else if (stats.isFile()) {
        this.injectBanner(file)
      }
    })
  }

  isIgnored(file) {
    file = file.split(path.sep)
    file.shift()
    file = file.join(path.sep)
    const ignore = this.ignore.test(file)
    this.ignore.lastIndex = 0
    return ignore
  }

  injectBanner(file) {
    let content = fs.readFileSync(file, 'utf-8')
    content = content.replace(/^([\s\r\n]*(\/\*\*[^]*?\*\/)?[\s\r\n]*)?/, this.banner({ file }) + '\n\n')
    fs.writeFileSync(file, content)
    console.log(colors.green('inject') + ' ' + file)
  }
}