const { h, Array: MutantArray, computed, map } = require('mutant')

const HEIGHT = 26
const WIDTH = 25
// const JOIN_WIDTH = 1

// 0: 12 1 12
// 1: 12 1 12
// 2: 11 3 11
// 3: 11 3 11
// 4:  9 5 9

const initialState = Array(WIDTH*HEIGHT)
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

const state = {
  board: MutantArray(initialState),
  colors: MutantArray([ 'teal', 'hotpink', 'rebeccapurple' ])
}
const colorLabels = [ 'background', 'primary', 'secondary' ]

const app = h('App', [
  computed([state.board, state.colors], (board, colors) => {
    const style = {
      display: 'grid',
      'grid-template-columns': `repeat(${WIDTH}, 12px)`,
      'grid-template-rows': `repeat(${HEIGHT}, 12px)`,
      'grid-gap': '1px'
    }
    return h('Drawing', { style }, [
      board.map((cel, i) => {
        if (cel === null) return
        
        const style = {
          'grid-column': getCol(i) + 1, // css-grid starts at 1
          'grid-row': getRow(i) + 1,
          'background-color': colors[cel]
        }

        return h('Cel', { 
          style,
          'ev-click': () => incrementCel(cel, i)
        })
      })
    ])
  }),
  h('Colors', 
    {
      style: {
        display: 'grid',
        'grid-template-columns': 'auto 1fr'
      }
    },
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
])

function incrementCel (cel, i) {
  state.board.put(i, (cel + 1) % 3)

  const row = getRow(i)
  const col = getCol(i)
  const radius = 12 - col
  if (radius === 0) return

  const mirrorI = row * WIDTH + 12 + radius
  console.log(i, mirrorI)
  state.board.put(mirrorI, (cel + 1) % 3)
}

function getRow (i) {
  return Math.floor(i / WIDTH)
}

function getCol (i) {
  return i % WIDTH
}

document.body.appendChild(app)
