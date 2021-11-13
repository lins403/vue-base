<template>
  <div class="chart-container">
    <el-row :gutter="32" class="chart-container-item">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <type-pie-linkage ref="TypePieLinkage" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <area-bar-linkage />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32" class="chart-container-item">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <growth-bar :height="'800px'" /> -->
          <growth-bar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TypePie from '../components/TypePie'
import AreaBar from '../components/AreaBar'
import baseOptions from '../mixins/base-options'
import Vue from 'vue'

// let $_caseType = Vue.observable('')
const EventBus = new Vue()
/******************************************************************/
const TypePieLinkage = {
  extends: TypePie,
  inject: ['chartQuery'],

  data() {
    return {
      selectedDataIndex: this.chartQuery.dataIndex,
      caseArea: undefined
    }
  },
  watch: {
    caseArea: {
      handler(val) {
        this.chartOptions.title.subtext = this.caseArea
        this.chartOptions.title.subtextStyle = { fontSize: 14, fontWeight: 500 }
        this.$nextTick(() => {
          this.chart.setOption(this.chartOptions)
        })
        console.log('+++++++', val)
      }
    },
    selectedDataIndex: {
      handler(val) {
        this.$nextTick(() => {
          EventBus.$emit('selectCaseType', {
            _caseType: this.chartOptions.legend.data[val]
          })

          // if (val !== this.chartQuery.dataIndex)
          //   this.$router.push({ path: this.$route.path, query: { dataIndex: val, caseType: this.chartOptions.legend.data[val] } })
          const _this = this
          this.chartOptions.series[0].itemStyle = {
            color: params => (params.dataIndex === parseInt(_this.selectedDataIndex) ? 'Tomato' : '#C1232B'),
            borderWidth: 1,
            borderColor: '#000'
          }
        })
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    EventBus.$on('selectCaseArea', params => {
      this.caseArea = params._caseArea
    })
  },
  methods: {
    handleChartClick() {
      this.chart.on('click', 'series', params => {
        this.selectedDataIndex = params.dataIndex
        this.chart.resize()

        // this.chart.dispatchAction({
        //   type: 'pieSelect',
        //   dataIndex: this.selectedDataIndex
        // })
      })
    }
  }
}
/******************************************************************/
const AreaBarLinkage = {
  extends: AreaBar,
  data() {
    return {
      selectedDataIndex: undefined,
      caseType: undefined
    }
  },
  watch: {
    selectedDataIndex: {
      handler(val) {
        this.$nextTick(() => {
          EventBus.$emit('selectCaseArea', {
            _caseArea: this.chartOptions.yAxis.data[val]
          })
        })
      }
    },
    caseType(val) {
      const _this = this
      this.chartOptions.title.subtext = val
      this.chartOptions.title.subtextStyle = { fontSize: 14, fontWeight: 500 }
      this.chartOptions.series[0].itemStyle = {
        color: params => (params.dataIndex === _this.selectedDataIndex ? 'Tomato' : '#C1232B')
      }
      this.$nextTick(() => {
        this.chart.setOption(this.chartOptions)
      })
      console.log('------', val)
    }
  },
  mounted() {
    EventBus.$on('selectCaseType', params => {
      this.caseType = params._caseType
    })
  },
  methods: {
    handleChartClick() {
      this.chart.getZr().on('click', params => {
        const pointInPixel = [params.offsetX, params.offsetY]
        if (this.chart.containPixel('grid', pointInPixel)) {
          const pointInGrid = this.chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
          this.selectedDataIndex = pointInGrid[1]
          this.chart.resize()
        }
      })
    }
  }
}
/******************************************************************/
const GrowthBar = {
  // functional: true,
  extends: baseOptions,
  data() {
    return {
      caseType: undefined,
      chartOptions: null
    }
  },
  watch: {
    caseType(val) {
      this.chartOptions.title.text = `${val}案例同比增长量统计分析`
      this.$nextTick(() => {
        this.chart.setOption(this.chartOptions)
      })
      console.log('=======', val)
    }
  },
  mounted() {
    EventBus.$on('selectCaseType', params => {
      this.caseType = params._caseType
    })
  }
}
/******************************************************************/
export default {
  name: 'TypePieArea',
  components: {
    TypePieLinkage,
    AreaBarLinkage,
    GrowthBar
  }
}
</script>
<style lang="scss" scoped>
.chart-container-item {
  margin-bottom: 2em;
}
</style>
