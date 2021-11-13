<script>
import baseOptions from '../mixins/base-options'

export default {
  name: 'TredingLineDaily',
  extends: baseOptions,
  props: {
    month: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.chartOptions = {
      title: {
        text: `${this.month}月案件量趋势分析`
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}日<br />{a}: {c}'
      },
      xAxis: {
        type: 'category',
        data: [...Array(30).keys()].map(i => Number(i) + 1)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '案件量',
          data: [22, 15, 13, 17, 15, 16, 12, 9, 13, 12, 18, 22, 15, 13, 17, 15, 16, 12, 9, 13, 12, 18, 27, 16, 12, 9, 13, 12, 18, 27],
          type: 'line',
          symbol: 'emptyCircle',
          smooth: false //true 为平滑曲线，false为直线
        }
      ]
    }
  },
  methods: {}
}
</script>
