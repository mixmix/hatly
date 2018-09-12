const { h, Array: MutantArray, computed, map } = require('mutant')
const Segment = require('./segment')

const HEIGHT = 26
const WIDTH = 25
// const JOIN_WIDTH = 1

// 0: 12 1 12
// 1: 12 1 12
// 2: 11 3 11
// 3: 11 3 11
// 4:  9 5 9


const state = {
  width: WIDTH,
  height: HEIGHT,
  board: MutantArray(initialState()),
  colors: MutantArray([ 'teal', 'hotpink', 'rebeccapurple' ])
}
const colorLabels = [ 'background', 'primary', 'secondary' ]

const app = h('App', [
  h('div.settings',
    { 
      style: {
        display: 'grid',
        'grid-template-columns': 'auto 1fr'
      }
    }, [
      Segment(state, { editable: true }),
      Colors(state),
    ]
  ),
  Preview(state)
])

function Colors (state) {
  const style =  {
      display: 'grid',
      'grid-template-columns': 'auto 1fr',
      'grid-gap': '1rem',
      'align-content': 'start'
    }
  return h('Colors', { style },
    colorLabels.map((label, i) => {
      return [
        h('label', label),
        h('input', {
          'ev-input': ev => {
            state.colors.put(i, ev.target.value)
          },
          value: computed(state.colors, colors => colors[i])
        })
      ]
    })
  )
}

function Preview (state) {
  const dummy = Array(7).fill(null).map((_, i) => i)

  const pixelSize = 10
  const gapSize = 0
  const radius = state.height * pixelSize + (state.height - 1) * gapSize

  const style = {
    width: `${2 * radius}px`,
    height: `${2 * radius}px`,
    position: 'relative'
  }

  return h('Preview', { style }, [
    dummy.map((_, i) => {
      const style = {
        position: 'absolute',
        transform: `translate(100%, 150%) rotate(${360/7 * i}deg)`,
        'transform-origin': '50% -5%',
        filter: 'blur(2px)'
      }
      return h('div', { style }, Segment(state, { pixelSize, gapSize }))
    })
  ])
}

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
