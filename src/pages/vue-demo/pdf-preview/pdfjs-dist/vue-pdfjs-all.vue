// source: https://juejin.cn/post/6909252620741787656
<template>
  <div class="preview-pdf">
    <h1>PDF在线预览</h1>
    <div :style="`margin:0 auto;width:${pdfWidth};`">
      <canvas v-for="page in pdfPages" :id="'pdfCanvas' + page" :key="page" />
    </div>
  </div>
</template>
<script>
const PDFJS = require('pdfjs-dist')
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js'
export default {
  data() {
    return {
      pdfPages: [], // 页数
      pdfWidth: '', // 宽度
      pdfSrc: '', // 地址
      pdfDoc: '', // 文档内容
      pdfScale: 1.0 // 放大倍数
    }
  },
  mounted() {
    this.getPdfUrl()
  },
  methods: {
    getPdfUrl() {
      // todo 请求后台，获取pdf的url，这里用的是线上的地址
      // this.pdfSrc = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
      this.pdfSrc = '/static/demo.pdf'
      this.loadFile(this.pdfSrc)
    },
    loadFile(url) {
      const loadingTask = PDFJS.getDocument(url)
      loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf
        this.pdfPages = pdf.numPages
        this.$nextTick(() => {
          this.renderPage(1)
        })
      })
    },
    renderPage(num) {
      const that = this
      this.pdfDoc.getPage(num).then(page => {
        const canvas = document.getElementById('pdfCanvas' + num)
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1
        const bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1
        const ratio = dpr / bsr
        const viewport = page.getViewport({ scale: this.pdfScale })
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio

        canvas.style.width = viewport.width + 'px'

        that.pdfWidth = viewport.width + 'px'

        canvas.style.height = viewport.height + 'px'

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        // 将 PDF 页面渲染到 canvas 上下文中
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (this.pdfPages > num) {
          this.renderPage(num + 1)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.preview-pdf {
  h1 {
    margin: 30px auto;
    font-family: '宋体', 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
