#!/usr/bin/env node
const options = require('yargs/yargs')(require('yargs/helpers').hideBin(process.argv))
  .scriptName('kemarkdown')
  .usage('Usage: $0 [--dumb] [--unsafe] [--noids]')
  .example('$0 < file.md > file.html', 'convert a Markdown file to HTML')
  .option('d', {
    alias: 'dumb',
    describe: 'Render dumb punctuation',
    type: 'boolean',
    default: false
  })
  .option('u', {
    alias: 'unsafe',
    describe: 'Render unsafe HTML',
    type: 'boolean',
    default: false
  })
  .option('n', {
    alias: 'noids',
    describe: 'Suppress heading IDs',
    type: 'boolean',
    default: false
  })
  .version()
  .alias('v', 'version')
  .help()
  .alias('h', 'help')
  .strict()
  .argv

const markdown = require('./')
const chunks = []
process.stdin
  .on('data', chunk => { chunks.push(chunk) })
  .once('error', error => {
    process.stderr.write(error.toString() + '\n')
    process.exit(1)
  })
  .once('end', () => {
    const input = Buffer.concat(chunks).toString()
    process.stdout.write(markdown(input, {
      dumb: options.dumb,
      unsafe: options.unsafe,
      noIDs: options.noids
    }))
    process.exit(0)
  })
