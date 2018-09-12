const { h, computed, map, resolve } = require('mutant')
const Picker = require('vanilla-picker')

module.exports = function Colors (state) {
  var activePicker

  const pickerRoot = h('div.picker')

  const colors = h('Colors', [
    resolve(state.colors).map((initialColor, i, colors) => {
      const classList = computed(state.activeColor, c => {
        return [
          c === i ? '-active' : '',
          isBridgeColor = i === colors.length -1 ? '-bridge-color' : ''
        ]
      })
      const color = computed(state.colors, colors => colors[i]) 

      return [
        h('label', {
          classList,
          'ev-click': () => state.activeColor.set(i)
        }, i + 1),
        h('div', {
          classList,
          style: { background: color },
          // 'ev-input': ev => {
          //   state.colors.put(i, ev.target.value)
          // },
          'ev-click': ev => {
            activePicker = i
            picker.setOptions({ color: resolve(color) })
            picker.openHandler()
          }
        }, color)
      ]
    }),
    pickerRoot
  ])

  picker = new Picker({
    parent: pickerRoot,
    alpha: false
  })
  picker.onChange = function (color) {
    if (activePicker === 'bridge') {
      state.bridgeColor.set(color.hex.slice(0, 7))
    } else {
      state.colors.put(activePicker, color.hex.slice(0, 7))
    }
  }

  return colors
}
