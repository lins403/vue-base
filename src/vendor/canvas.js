import html2canvas from 'html2canvas'
// 参数配置：https://html2canvas.hertzen.com/configuration

//--------------------------------------------/* appendCanvas */--------------------------------------------
/**
 * @description: 将传入的HTML结点，转换为canvas对象，并插入到DOM中
 * @param {*}
 * @return {*}
 */
export const appendCanvas = (el, params) => {
  html2canvas(el, params)
    .then(canvas => {
      document.body.appendChild(canvas)
    })
    .catch(err => console.error(err))
}
// appendCanvas(document.querySelector('.container'), { width: 200, height: 300 })

//--------------------------------------------/* saveAsImg */--------------------------------------------
/**
 * @description: 将传入的HTML结点转成canvas后，生成图片插入到DOM中
 * @param {*}
 * @return {*}
 */
export const saveAsImg = el => {
  html2canvas(el).then(canvas => {
    const dataUrl = canvas.toDataURL()
    const newImg = document.createElement('img')
    newImg.src = dataUrl
    newImg.width = 200
    document.body.appendChild(newImg)
  })
}

//--------------------------------------------/* saveFile */--------------------------------------------
import { saveAs } from 'file-saver'
/**
 * @description: html2canvas & file-saver，将HTML结点生成图片保存至本地
 * @param {*}
 * @return {*}
 */
export const saveFile = (el, fileName) => {
  html2canvas(el).then(canvas => {
    canvas.toBlob(blob => {
      saveAs(blob, fileName)
    })
  })
}
// saveFile(document.querySelector('.container'), 'container.png') //webp,jpg,jpeg,gif

//--------------------------------------------/*  */--------------------------------------------
