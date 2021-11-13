/***** echarts v4 *****/
import echarts from 'echarts/lib/echarts'
require('echarts/theme/infographic') // echarts theme
import resize from './resize'

export default {
  render: function (h) {
    return h('div', {
      class: 'className',
      style: {
        height: this.height,
        width: this.width
      }
    })
  },
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      chartOptions: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // this.chart.showLoading()
      this.chart = echarts.init(this.$el, 'infographic')
      this.chart.setOption(this.chartOptions)
      this.handleChartClick()
    },
    handleChartClick() {
      this.chart.on('click', 'series', params => {
        console.log(params)
      })
    }
  }
}
