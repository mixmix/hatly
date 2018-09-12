const { h, computed } = require('mutant')

module.exports = function Segment (state, opts = {}) {
  const {
    width,
    height,
    board,
    colors
  } = state
  const {
    editable,
    pixelSize = 10,
    gapSize = 1
  } = opts

  return computed([board, colors], (board, colors) => {
    const style = {
      display: 'grid',
      'grid-template-columns': `repeat(${width}, ${pixelSize}px)`,
      'grid-template-rows': `repeat(${height}, ${pixelSize}px)`,
      'grid-gap': `${gapSize}px`,
      width: `${width * pixelSize + (width-1)*gapSize}px`
    }
    return h('Segment', { style }, [
      board.map((cel, i) => {
        if (cel === null) return
        
        const style = {
          'grid-column': getCol(i) + 1, // css-grid starts at 1
          'grid-row': getRow(i) + 1,
          'background-color': colors[cel]
        }

        if (!editable) return h('Cel', { style })

        return h('Cel', { 
          style,
          'ev-click': () => incrementCel(cel, i)
        })
      })
    ])
  })


  function incrementCel (cel, i) {
    state.board.put(i, (cel + 1) % 3)

    const row = getRow(i)
    const col = getCol(i)
    const radius = 12 - col
    if (radius === 0) return

    const mirrorI = row * width + 12 + radius
    state.board.put(mirrorI, (cel + 1) % 3)
  }

  // repeated...
  function getRow (i) {
    return Math.floor(i / width)
  }

  function getCol (i) {
    return i % width
  }
}

