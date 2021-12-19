// 不适用于多表头
<template>
  <div class="home">
    <div class="tableItem">
      <el-table :data="tableData" :cell-style="columnStyle" border>
        <el-table-column v-for="(value, key, index) in xlsxData[0]" :key="index" :prop="key" :label="key" min-width="160px" align="left" />
      </el-table>
    </div>
    <el-pagination
      :current-page="currpage"
      :page-sizes="[10, 20, 40, 60]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from 'axios'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableau: null,
      currpage: 1,
      pagesize: 10,
      totalNum: 0,
      xlsxData: [],
      card: [], // excel表格sheet的数组
      cardActive: '', // excel表格当前显示的sheet
      workbook: {}
    }
  },
  computed: {
    tableData() {
      return this.xlsxData.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize)
    }
  },
  mounted() {
    axios
      .get('/demo.xlsx', {
        responseType: 'arraybuffer' // 设置响应体类型为arraybuffer
      })
      .then(({ data }) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' }) // 解析数据
        this.workbook = workbook
        const sheetNames = workbook.SheetNames // 工作表名称集合
        this.card = sheetNames
        this.cardActive = sheetNames[0]
        this.getTable(sheetNames[0])
      })
  },
  methods: {
    getTable(sheetName) {
      this.Matches = []
      this.currpage = 1
      var worksheet = this.workbook.Sheets[sheetName]
      this.xlsxData = XLSX.utils.sheet_to_json(worksheet)
      // 获取第一行（即表头）
      var header = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]
      console.log(this.xlsxData)
      console.log(header)
      var tableTitle = this.xlsxData[0]
      var table0 = {}
      // 这里对表头进行处理，因为获取的数据渲染表头是根据第一条数据，
      // 当excel文件中第一条数据有为空时，第一条数据没有此属性，数据就不渲染，所以把为空的属性设置成“”
      for (var i = 0; i < header.length; i++) {
        if (Object.prototype.hasOwnProperty.call(tableTitle, header[i])) {
          table0[header[i]] = tableTitle[header[i]]
        } else {
          table0[header[i]] = ''
        }
      }
      this.xlsxData[0] = table0
      this.totalNum = this.xlsxData.length
    },
    // 给列设置背景色
    columnStyle({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return 'background:rgba(147, 195, 235,0.05);'
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currpage = val
    }
  }
}
</script>
