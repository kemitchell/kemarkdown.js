const Remarkable = require('remarkable').Remarkable

module.exports = (markup, options = {}) => {
  if (typeof markup !== 'string') {
    throw new Error('markup argument not a string')
  }
  const {
    unsafe = false,
    dumb = false,
    noIDs = false
  } = options
  const parser = new Remarkable({
    html: unsafe,
    typographer: !dumb
  })
  if (!noIDs) {
    parser.use(remarkable => {
      remarkable.renderer.rules.heading_open = (tokens, index) => {
        const level = tokens[index].hLevel
        const text = tokens[index + 1].content
        const slug = text
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/-+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        return `<h${level} id="${slug}">`
      }
    })
  }
  return parser.render(markup)
}