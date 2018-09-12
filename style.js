const readDir = require('read-directory').sync
const path = require('path')
const h = require('mutant/h')
const compile = require('micro-css')

const content = readDir(path.join(__dirname, './'), {
  filter: '**/*.mcss',
  ignore: '**/node_modules',
  extensions: false
})

const mcss = Object.keys(content)
  .map(k => content[k])
  .reduce((acc, el) => {
    acc.push(el)
    return acc
  }, [])
  .join('\n')

module.exports = h('style', compile(mcss))
