<script>
import baseOptions from '../mixins/base-options'
import LinearGradient from 'zrender/src/graphic/LinearGradient'

export default {
  name: 'AreaBar',
  extends: baseOptions,
  created() {
    this.chartOptions = {
      title: {
        text: '各区域案例量统计分析'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['新日', '暮里']
      },
      series: [
        {
          name: '案例量',
          type: 'bar',
          data: [36, 25],
          itemStyle: {
            // color: params => params.dataIndex % 2 === 0 ? '#EAC445' : '#C1232B'
            normal: {
              color: params => {
                const color = ['#2193b0', '#DD5E89']
                const downcolor = ['#6dd5ed', '#F7BB97']
                return new LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: color[params.dataIndex % 2] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: downcolor[params.dataIndex % 2] // 100% 处的颜色
                  }
                ])
              },
              label: {
                show: true //开启显示
              }
            }
          }
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
          // const options = this.chart.getOption()
          const city = this.chartOptions.yAxis.data[pointInGrid[1]]
          this.$router.push({ path: this.$route.path + '/area-bar', query: { city } })
        }
      })
    }
  }
}
</script>
