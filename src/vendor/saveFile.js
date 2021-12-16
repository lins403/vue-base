// npm install file-saver
// https://github.com/eligrey/FileSaver.js

import { saveAs } from 'file-saver'

export const saveAsText = (data, fileName) => {
  const blob = new Blob(data, { type: 'text/plain;charset=utf-8' })
  saveAs(blob, fileName)
}

export const saveAsjson = (data, fileName) => {
  const blob = new Blob(data, { type: 'application/json' })
  saveAs(blob, fileName)
}

export const saveUrl = (url, fileName) => {
  saveAs(url, fileName)
  // saveAs('https://httpbin.org/image', 'image.jpg')
}

export const saveCanvas = (canvasNode, fileName) => {
  // const canvasNode = document.getElementById('my-canvas')
  canvasNode.toBlob(function (blob) {
    saveAs(blob, fileName)
  })
}
