<template>
  <button @click="handleClick">demo.pdf</button>
</template>

<script>
export default {
  name: 'EasyEase',
  data() {},
  methods: {
    handleClick() {
      // const pdfUrl = 'http://localhost:1024/static/demo.pdf'
      const pdfUrl = '/static/demo.pdf'
      window.open(`static/pdf.js/web/viewer.html?file=${pdfUrl}`)
    }
  }
}
</script>
