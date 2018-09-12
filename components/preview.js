const { h } = require('mutant')
const Segment = require('./segment')

module.exports = function Preview (state) {
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

