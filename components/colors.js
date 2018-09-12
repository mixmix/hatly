const { h, computed, map, resolve } = require('mutant')

module.exports = function Colors (state) {
  return h('Colors',
    computed(state.colors, (colors) => {

      return colors.map((color, i) => {
        const className = computed(state.activeColor, c => c === i ? '-active' : '')

        return [
          h('label', {
            className,
            'ev-click': () => state.activeColor.set(i)
          }, i + 1),
          h('input', {
            className,
            style: { background: color },
            'ev-input': ev => {
              state.colors.put(i, ev.target.value)
            },
            value: color
          })
        ]
      })
    })
  )
}
