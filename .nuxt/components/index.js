export { default as CardCharacter } from '../..\\components\\card-character.vue'
export { default as Menu } from '../..\\components\\menu.vue'
export { default as PainelCard } from '../..\\components\\painel-card.vue'
export { default as ChartsShapeChartPie } from '../..\\components\\charts-shape\\chart-pie.vue'
export { default as ChartsFinalLiveChartPie } from '../..\\components\\charts-final\\live-chart-pie.vue'
export { default as ChartsFinalSideChartPie } from '../..\\components\\charts-final\\side-chart-pie.vue'
export { default as ListsListCharacterInfo } from '../..\\components\\lists\\list-character-info.vue'
export { default as ListsListEpisodes } from '../..\\components\\lists\\list-episodes.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
