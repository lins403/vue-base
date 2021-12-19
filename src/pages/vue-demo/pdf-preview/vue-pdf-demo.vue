<!--
 * @Description: 使用vue-pdf预览PDF文件，并自定义渲染样式
 * More examples: https://github.com/FranckFreiburger/vue-pdf
 * More details: https://lins403.github.io/vuepress-doc/notesList/packages/pdf.html
-->

<template>
  <div>
    <pdf v-for="i in numPages" :key="i" :src="src" :page="i" style="display: inline-block; width: 50%" />
  </div>
</template>

<script>
import pdf from 'vue-pdf'

// public/static/demo.pdf
var loadingTask = pdf.createLoadingTask('static/demo.pdf')

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: loadingTask,
      numPages: undefined
    }
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages
    })
  }
}
</script>
