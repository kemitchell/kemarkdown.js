# kemarkdown

Markdown to HTML renderer

## Node.js Module

`kemarkdown(markup, { dumb, unsafe, noIDs, slugger })`

```javascript
const markdown = require('kemarkdown')
const assert = require('assert')

assert.strictEqual(
  markdown('this is a _test_'),
  '<p>this is a <em>test</em></p>\n'
)

assert.strictEqual(
  markdown('this could\'ve failed'),
  '<p>this could’ve failed</p>\n'
)

assert.strictEqual(
  markdown('this could\'ve failed', { dumb: true }),
  '<p>this could\'ve failed</p>\n'
)

assert.strictEqual(
  markdown('# Test'),
  '<h1 id="test">Test</h1>\n'
)

assert.strictEqual(
  markdown('# Test', { noIDs: true }),
  '<h1>Test</h1>\n'
)

assert.strictEqual(
  markdown('# Test', { slugger: text => 'TEST' }),
  '<h1 id="TEST">Test</h1>\n'
)

assert.strictEqual(
  markdown('this is a <em>test</em>'),
  '<p>this is a &lt;em&gt;test&lt;/em&gt;</p>\n'
)

assert.strictEqual(
  markdown('highlight ==some== text'),
  '<p>highlight <mark>some</mark> text</p>\n'
)

assert.strictEqual(
  markdown('We ~~am~~++are++ the champions.'),
  '<p>We <del>am</del><ins>are</ins> the champions.</p>\n'
)

assert.strictEqual(
  markdown('this is a <em>test</em>', { unsafe: true }),
  '<p>this is a <em>test</em></p>\n'
)

assert.strictEqual(
  markdown('do not replace with (c) copyright symbol', { unsafe: true }),
  '<p>do not replace with (c) copyright symbol</p>\n'
)

assert.strictEqual(
  markdown('do not replace with --- em dash', { unsafe: true }),
  '<p>do not replace with --- em dash</p>\n'
)
```

## Command Line Interface

`npm i -g kemarkdown ; kemarkdown --help` or `npx kemarkdown --help`

```javascript
const spawnSync = require('child_process').spawnSync

assert.strictEqual(
  spawnSync('./bin.js', {
    input: 'this is a test'
  }).stdout.toString(),
  '<p>this is a test</p>\n'
)

assert.strictEqual(
  spawnSync('./bin.js', ['--unsafe'], {
    input: 'this is a <em>test</em>'
  }).stdout.toString(),
  '<p>this is a <em>test</em></p>\n'
)

assert.strictEqual(
  spawnSync('./bin.js', ['--dumb'], {
    input: 'this isn\'t complicated'
  }).stdout.toString(),
  '<p>this isn\'t complicated</p>\n'
)

assert.strictEqual(
  spawnSync('./bin.js', ['--noids'], {
    input: '# Test'
  }).stdout.toString(),
  '<h1>Test</h1>\n'
)
```
