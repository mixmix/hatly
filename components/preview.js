const { h, computed } = require('mutant')
const Segment = require('./segment')

module.exports = function Preview (state) {
  const dummy = Array(7).fill(null).map((_, i) => i)

  const pixelSize = 13
  const gapSize = 0
  const radius = (state.height + 1) * pixelSize

  const style = {
    width: `${2.4 * radius}px`,
    height: `${2.4 * radius}px`,
    position: 'relative'
  }
  
  const bridgeColor = computed(state.colors, colors => {
    return colors[colors.length - 1]
  })

  return h('Preview', { style }, [
    dummy.map((_, i) => {
      const style = {
        position: 'absolute',
        transform: `translate(${radius}px, ${radius*1.4}px) rotate(${360/7 * i}deg)`,
        'transform-origin': `50% -${pixelSize}px`,
        width: `${state.width * pixelSize}px`,
        height: `${state.height * pixelSize}px`,
        background: bridgeColor
      }
      return h('div', { style })
    }),
    dummy.map((_, i) => {
      const style = {
        position: 'absolute',
        transform: `translate(${radius}px, ${radius*1.4}px) rotate(${360/7 * i}deg)`,
        'transform-origin': `50% -${pixelSize}px`,
        filter: 'blur(2px)'
      }
      return h('div', { style }, Segment(state, { pixelSize, gapSize }))
    })
  ])
}

