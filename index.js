const { h, Array: MutantArray, Value, resolve, computed } = require('mutant')
const Picker = require('vanilla-picker')
const Segment = require('./components/segment')
const Colors = require('./components/colors')
const Preview = require('./components/preview')
const style = require('./style')

const HEIGHT = 26
const WIDTH = 25
// const JOIN_WIDTH = 1

const state = {
  width: WIDTH,
  height: HEIGHT,
  board: MutantArray(initialState()),
  colors: MutantArray([ 'teal', 'hotpink', 'rebeccapurple', 'fuchsia' ]),
  activeColor: Value(0)
}

window.addEventListener('keyup', ev => {
  const n = Number(ev.key)
  if (!n) return

  if (n > 0 && n -1 < resolve(state.colors).length) {
    state.activeColor.set(n - 1)
  }
})

const app = h('App', [
  h('div.settings',
    { 
      style: {
        display: 'grid',
        'grid-template-columns': 'auto 1fr'
      },
    }, [
      Segment(state, { editable: true }),
      Colors(state),
    ]
  ),
  Preview(state)
])

function initialState () {
  return Array(WIDTH*HEIGHT)
    .fill(null)
    .map((cel, i) => {
      const column = getCol(i)
      const row = getRow(i)
      const radius = Math.floor(row / 2)

      // NOTE 12 is hardcoded based on WIDTH)
      return (column >= 12 - radius) && (column <= 12 + radius)
        ? 0
        : null
    })


  function getRow (i) {
    return Math.floor(i / WIDTH)
  }

  function getCol (i) {
    return i % WIDTH
  }
}

document.body.appendChild(app)
document.head.appendChild(style)
