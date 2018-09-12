const readDir = require('read-directory').sync
const path = require('path')
const h = require('mutant/h')
const compile = require('micro-css')
const fs = require('fs')

const files = readDir(path.join(__dirname, './'), {
  filter: '**/*.mcss',
  ignore: '**/node_modules',
  extensions: false
})

const mcss = Object.keys(files)
  .map(k => files[k])
  .reduce((acc, el) => {
    acc.push(el)
    return acc
  }, [])
  .join('\n')

const content = `
module.exports = \`${compile(mcss)}\`
`

fs.writeFileSync(path.join(__dirname, 'css.js'), content)
