<template>
  <input type="file" @change="onChange($event)" />
</template>

<script>
import mammoth from 'mammoth'
import { saveAs } from 'file-saver'
import axios from 'axios'
export default {
  methods: {
    onChange(event) {
      var file = event.target.files[0]
      var reader = new FileReader()
      // eslint-disable-next-line no-unused-vars
      reader.onload = function (event) {
        const arrayBuffer = new Uint8Array(reader.result)
        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(function (result) {
            const html = result.value // The generated HTML
            const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
            saveAs(blob, file.name.replace(/^(.*\.).*$/, '$1html'))
          })
          .catch(err => console.warn(err))
          .done()
      }
      reader.readAsArrayBuffer(file)
    },
    getDocument() {
      axios
        .get('/demo.docx', {
          responseType: 'arraybuffer' // 设置响应体类型为arraybuffer
        })
        .then(arrayBuffer => {
          mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then().catch()
        })
    }
  }
}
</script>

// about FileReader: https://codesandbox.io/s/pensive-cerf-nuvnc?file=/js-basic/file-reader.html
