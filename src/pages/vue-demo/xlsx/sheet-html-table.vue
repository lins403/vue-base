<template>
  <basic-container class="weekly">
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="请选择查询日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      clearble
      class="weekly__date-picker"
    />
    <el-button size="small" type="primary" icon="el-icon-search" class="weekly-btn" @click="handleSearch">搜索</el-button>
    <el-button size="small" type="warning" icon="el-icon-download" class="weekly-btn" @click="handleExport">导出</el-button>
    <div v-loading="loading" class="tableau" v-html="tableData" />
  </basic-container>
</template>

<script>
import axios from 'axios'
import XLSX from 'xlsx'
import { throttle } from 'lodash'
const weeeklyReportApi = '/api/analysis/export/weekly?date='

export default {
  data() {
    return {
      tableData: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 86400000
        }
      },
      date: '',
      cacheDate: '',
      cache: false,
      loading: false
    }
  },
  created() {
    // this.getData()
    this.excel2html()
  },
  methods: {
    getData() {
      // public/demo.xlsx
      axios
        .get('/demo.xlsx', {
          responseType: 'arraybuffer' // 设置响应体类型为arraybuffer
        })
        .then(({ data }) => {
          const workbook = XLSX.read(new Uint8Array(data), { type: 'array' }) // 解析数据
          var worksheet = workbook.Sheets[workbook.SheetNames[0]] // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
          this.tableData = XLSX.utils.sheet_to_html(worksheet) // 渲染
        })
    },
    excel2html() {
      axios
        .get('/demo.xlsx', {
          responseType: 'blob'
        })
        .then(response => {
          var reader = new FileReader()
          reader.onload = e => {
            // 预处理
            var binary = ''
            var buf = new Uint8Array(e.target.result)
            var length = buf.byteLength
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(buf[i])
            } // 读取excel
            const wb = XLSX.read(binary, { type: 'binary' })
            console.log('wb', wb)
            // 抓取第一个sheet
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            this.tableData = XLSX.utils.sheet_to_html(ws)
          }
          reader.readAsArrayBuffer(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      return this.fileContent
    },
    async getRemoteData(date) {
      this.cache = false
      this.loading = true
      const res = await axios.get(encodeURI(weeeklyReportApi + date), { responseType: 'arraybuffer' })
      this.loading = false
      if (res.headers['errormsg'] || !res.data) {
        this.$message.error(decodeURIComponent(res.headers['errormsg'] || '数据请求失败'))
        return
      }
      this.cacheDate = date
      try {
        // 解析数据
        const workbook = XLSX.read(new Uint8Array(res.data), { type: 'array' })
        // 取出第一个工作表
        var worksheet = workbook.Sheets[workbook.SheetNames[0]]
        // 渲染
        this.tableData = XLSX.utils.sheet_to_html(worksheet)
        this.cache = true
      } catch (error) {
        console.error('[weeky report error]: ', error)
        this.$message.error('解析错误')
      }
    },
    handleSearch: throttle(
      function () {
        if (!this.date) {
          this.$message.error('请选择查询日期')
          return
        }
        if (this.date !== this.cacheDate) this.getRemoteData(this.date)
      },
      1000,
      { leading: true, trailing: false }
    ),
    handleExport: throttle(
      function () {
        if (!this.cache || !this.date) {
          this.$message.error('请选择查询日期')
          return
        }
        this.handleDownload()
      },
      1000,
      { leading: true, trailing: false }
    ),
    async handleDownload() {
      try {
        const res = await axios.get(weeeklyReportApi + this.date, { responseType: 'blob' })
        this.downloadFile(res)
      } catch (err) {
        this.$message.error(err.toString().replace('Error:', '导出失败: ') || '导出失败')
      }
    },
    downloadFile(res) {
      const data = res.data
      // 此处提示自定义提示语，从header中获取
      if (res.headers['errormsg'] || !data) throw new Error(decodeURIComponent(res.headers['errormsg']) || '导出失败')
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // 文件名在后端设置
      link.setAttribute('download', decodeURIComponent(res.headers['content-disposition']).split("''")[1])
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
<style lang="scss" scoped>
$border-style: 1px solid #e8eaec;
::v-deep table {
  border-right: $border-style;
  border-bottom: $border-style;
  border-collapse: collapse;
  margin: auto;

  tbody tr:first-child td,
  tr td:first-child[rowspan] {
    text-align: center;
    font-weight: bold;
  }

  td {
    border-left: $border-style;
    border-top: $border-style;
    white-space: wrap;
    text-align: left;
    min-width: 100px;
    padding: 4px;
  }
}

.weekly {
  margin-bottom: 2em;
  ::v-deep .el-card__body {
    width: 100%;
  }
  &__date-picker {
    margin: 0 1em;
  }
  &-btn {
    margin: 0 0.5em;
  }
  .tableau {
    padding: 2em;
    padding-bottom: 1em;
    overflow-x: auto;
  }
}

/*定义滚动条高宽及背景高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 0.8em;
  height: 0.8em;
  background-color: #f5f5f5;
}
/*定义滚动条轨道内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.25em rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 0.25em rgba(0, 0, 0, 0.3);
  border-radius: 0.5em;
  background-color: #f5f5f5;
}
/*定义滑块内阴影+圆角*/
::-webkit-scrollbar-thumb {
  @extend ::-webkit-scrollbar-track;
  background-color: #555;
}
</style>
