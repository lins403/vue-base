<template>
  <el-table v-loadmore:el-table__body-wrapper="loadMore" :data="tableData" style="width: 100%" height="200">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<script>
export default {
  directives: {
    loadmore: {
      bind: (el, binding) => {
        // overflow为scroll的区域
        const SELECTWRAP = binding.arg ? el.querySelector(`.${binding.arg}`) : el
        SELECTWRAP.addEventListener('scroll', function () {
          if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
            binding.value()
          }
        })
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    loadMore() {
      console.log('123')
    }
  }
}
</script>
