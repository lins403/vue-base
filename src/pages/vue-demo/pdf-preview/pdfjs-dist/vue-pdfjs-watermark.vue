// source: https://juejin.cn/post/6920148445084778510
<template>
  <div class="preview-pdf">
    <h1>PDF在线预览</h1>
    <div :style="`margin:0 auto;width:${pdfWidth};`">
      <canvas v-for="page in totalPage" :id="'pdfCanvas' + page" :key="page" />
    </div>
  </div>
</template>
<script>
const PDFJS = require('pdfjs-dist')
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js'
export default {
  data() {
    return {
      // currentPage: 1,
      width: 0,
      height: 0,
      watermark: '@小眯嘻',
      totalPage: 1, // 页数
      pdfWidth: '',
      pdfSrc: '',
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
        this.totalPage = pdf.numPages
        this.$nextTick(() => {
          this._renderPage(1)
        })
      })
    },
    _getRatio(ctx) {
      const dpr = window.devicePixelRatio || 1
      const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1
      return dpr / bsr
    },
    _renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        const canvas = document.getElementById('pdfCanvas' + num)
        const ctx = canvas.getContext('2d')
        const ratio = this._getRatio(ctx)
        const viewport = page.getViewport({ scale: this.pdfScale })

        this.width = canvas.width = viewport.width * ratio
        this.height = canvas.height = viewport.height * ratio

        this.pdfWidth = canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        // 将 PDF 页面渲染到 canvas 上下文中
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }

        // page.render(renderContext)
        page.render(renderContext).promise.then(() => {
          // 渲染水印
          this._renderWatermark(num)
        })

        if (this.totalPage > num) {
          this._renderPage(num + 1)
        }
      })
    },
    _initWatermark() {
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D
      const ctx = canvas.getContext('2d')
      ctx.rotate((-18 * Math.PI) / 180)
      ctx.font = '400 14px 微软雅黑'
      ctx.fillStyle = 'rgba(200, 200, 200, .3)'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.watermark, 50, 50)

      return canvas
    },
    _renderWatermark(num) {
      const canvas = document.querySelector('#pdfCanvas' + num)
      const ctx = canvas.getContext('2d')
      // 平铺水印
      const pattern = ctx.createPattern(this._initWatermark(), 'repeat')
      ctx.rect(0, 0, this.width, this.height)
      ctx.fillStyle = pattern
      ctx.fill()
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
