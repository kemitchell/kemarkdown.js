const Remarkable = require('remarkable').Remarkable

module.exports = (markup, {
  unsafe = false,
  dumb = false,
  noIDs = false,
  slugger = defaultSlugger
} = {}) => {
  if (typeof markup !== 'string') {
    throw new Error('markup argument not a string')
  }
  if (typeof slugger !== 'function') {
    throw new Error('slugger option not a function')
  }
  const parser = new Remarkable({
    html: unsafe,
    typographer: !dumb
  })
  if (!noIDs) {
    parser.use(remarkable => {
      remarkable.renderer.rules.heading_open = (tokens, index) => {
        const level = tokens[index].hLevel
        const text = tokens[index + 1].content
        const slug = slugger(text)
        return `<h${level} id="${slug}">`
      }
    })
  }
  return parser.render(markup)
}

function defaultSlugger (text) {
  return text
    .toLowerCase()
    // Replace all spaces with dashes.
    .replace(/ /g, '-')
    // Collapse runs of dashes.
    .replace(/-+/g, '-')
    // Delete non-ASCII-word characters.
    .replace(/[^a-z0-9-]/g, '')
}
