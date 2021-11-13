<script>
import baseOptions from '../mixins/base-options'

export default {
  name: 'TrendingLine',
  extends: baseOptions,
  created() {
    this.chartOptions = {
      title: {
        text: '案例量趋势分析'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}月<br />{a}: {c}'
      },
      xAxis: {
        type: 'category',
        data: [...Array(12).keys()].map(i => Number(i) + 1)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '案例量',
          data: [39, 35, 20, 31, 22, 19, 30, 19, 22, 25, 10, 2],
          type: 'line',
          symbol: 'emptyCircle',
          smooth: false //true 为平滑曲线，false为直线
        }
      ]
    }
  },
  methods: {
    handleChartClick() {
      this.chart.getZr().on('click', params => {
        const pointInPixel = [params.offsetX, params.offsetY]
        if (this.chart.containPixel('grid', pointInPixel)) {
          const pointInGrid = this.chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
          const month = pointInGrid[0] + 1
          this.$router.push({ path: this.$route.path + '/trending-line', query: { month } })
        }
      })
    }
  }
}
</script>
