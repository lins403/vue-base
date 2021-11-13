<script>
import baseOptions from '../mixins/base-options'

export default {
  name: 'TypePie',
  extends: baseOptions,
  created() {
    this.chartOptions = {
      title: {
        text: '****统计分析'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>{a} : {d}%'
      },
      label: {
        formatter: '{b} {c}件 {d}%'
      },
      legend: {
        left: 'center',
        bottom: '0',
        data: ['hello', 'world']
      },
      series: [
        {
          name: '**量占比',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 100],
          center: ['55%', '40%'],
          data: [
            { name: 'hello', value: '123' },
            { name: 'world', value: '987' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 1600
        }
      ]
    }
  },
  methods: {
    handleChartClick() {
      this.chart.on('click', 'series', params => {
        const caseType = params.name
        const dataIndex = params.dataIndex
        this.$router.push({ path: this.$route.path + '/type-pie', query: { caseType, dataIndex } })
      })
    }
  }
}
</script>
