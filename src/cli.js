#!/usr/bin/env node

import Banner from './Banner'
import colors from 'colors'

const args = process.argv.slice(2)
const command = args.shift()

if (command === 'help') {
  console.log(`usage: ${colors.cyan('file-banner')} <command> [options]

available git commands 
  ${colors.yellow('<rootdir>')} [--ignore <RegExp>]
  ${colors.yellow('help')}
`)
} else {
  const options = {
    root: command
  }
  let lastArg
  args.forEach(item => {
    if (item.indexOf('--') === 0) {
      item = item.slice(2)
      options[item] = true
      lastArg = item
    } else {
      options[lastArg] = item
    }
  })
  new Banner(options)
}