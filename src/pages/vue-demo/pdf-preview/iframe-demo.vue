<template>
  <iframe id="viewer" :src="previewUrl" :height="height" :width="width">
    This browser does not support PDFs. Please download the PDF to view it:
    <a :href="previewUrl">Download PDF</a>
  </iframe>
  <!-- <embed :src="previewUrl" type="application/pdf" :height="height" :width="width"> -->
</template>

<script>
import axios from 'axios'
export default {
  name: 'IframePdf',
  data() {
    return {
      previewUrl: 'static/demo.pdf',
      height: 200,
      width: 300
    }
  },
  mounted() {
    // this.getPdf()
    this.width = window.innerWidth
    this.height = window.innerHeight
  },
  methods: {
    async getPdf() {
      // await axios.get('static/demo.pdf', {
      const blob = (
        await axios.get('/api/file/download?filename=demo.pdf', {
          responseType: 'blob'
        })
      ).data
      this.previewUrl = window.URL.createObjectURL(blob)
    }
  }
}
</script>

<style lang="scss" scoped></style>
