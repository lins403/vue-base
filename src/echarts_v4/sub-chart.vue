<template>
  <div>
    <el-button type="primary" class="sub-chart-back" @click="handleBack">返回</el-button>
    <div v-if="chartType" class="app-container">
      <component :is="chartComponent" v-bind="$route.query" />
    </div>
  </div>
</template>

<script>
import TrendingLineDaily from './subComponents/TrendingLineDaily'
import TypeBarArea from './subComponents/TypeBarArea'

const TypeComponentMap = {
  'trending-line': 'TrendingLineDaily',
  'type-pie': 'TypeBarArea'
}

export default {
  name: 'SubChart',
  components: {
    TrendingLineDaily,
    TypeBarArea
  },
  provide() {
    return { chartQuery: this.$route.query }
  },
  props: {
    chartType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    chartComponent() {
      return TypeComponentMap[this.chartType]
    }
  },
  created() {
    console.log(this.chartType)
    console.log(this.$route.query)
  },
  methods: {
    handleBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .sub-chart-back {
  margin: 2em 0 0 2em;
  padding: 10px 25px;
  letter-spacing: 2px;
}
</style>
