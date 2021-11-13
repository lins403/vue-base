<template>
  <div class="app-container">
    <div class="chart-header">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline" label-width="88px">
        <el-form-item label="发生区域">
          <el-select v-model="formInline.city" placeholder="请选择发生区域" size="small" clearable @change="changeCity">
            <el-option v-for="item in cityOptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
          <el-select v-model="formInline.town" size="small" clearable @change="changeTown">
            <el-option v-for="item in townOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="formInline.village" size="small" clearable>
            <el-option v-for="item in villageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 24px">
          <el-button type="warning" size="small" @click="onReset">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button type="success" size="small" @click="onSubmit">导出分析报告</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-container">
      <el-row :gutter="32" class="chart-container-item">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <trending-line />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32" class="chart-container-item">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <type-pie :height="'390px'" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TrendingLine from './components/TrendingLine'
import TypePie from './components/TypePie'
import { treeSelect } from '@/api/system/institution'

export default {
  name: 'MainChart',
  components: { TrendingLine, TypePie },
  data() {
    return {
      formInline: {
        city: '',
        town: '',
        village: ''
      },
      cityOptions: []
    }
  },
  computed: {
    townOptions() {
      const citySelected = this.cityOptions.filter(item => item.id === this.formInline.city)
      return citySelected.length > 0 ? citySelected[0].children : []
    },
    villageOptions() {
      const townSelected = this.townOptions.filter(item => item.id === this.formInline.town)
      return townSelected.length > 0 ? townSelected[0].children : []
    }
  },
  created() {
    this.getCityOptions()
  },
  methods: {
    async getCityOptions() {
      const treeData = await treeSelect()
      this.cityOptions = treeData.data[0].children
    },
    changeCity() {
      this.formInline.town = ''
      this.formInline.village = ''
    },
    changeTown() {
      this.formInline.village = ''
    },
    onReset() {
      this.formInline = {
        city: '',
        town: '',
        village: ''
      }
    },
    onSearch() {
      this.$message.info('search!')
    },
    onSubmit() {
      this.$message.success('export!')
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;

  .chart-wrapper {
    background: #fff;
    padding: 1em 1em 0;
    // height: 300px;
    margin-bottom: 2em;
  }
}
</style>
