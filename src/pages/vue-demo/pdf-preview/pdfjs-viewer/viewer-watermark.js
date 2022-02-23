/* eslint-disable */
// source：https://juejin.cn/post/7039607610793803789
// 添加水印需要在pdf.js中的web->viewer.js中添加代码，在js中找到textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.textLayerMode === _ui_utils.TextLayerMode.ENABLE_ENHANCE, this.eventBus);这行代码，在这行代码前面添加以下代码
//==================================/* 给文件添加水印 */==================================
var cover = document.createElement('div')
cover.className = 'cover'
function formateTime() {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  // return year + '/' + month + '/' + day + ' ' + hour + ':' + minute
  return year + '/' + month + '/' + day
}
let watermark_txt // 这个是根据需求加的用户名+时间，可以自己改
// let username = localStorage.getItem('username')
let username = '@小眯嘻'
if (username) {
  watermark_txt = username + '\n' + formateTime()
} else {
  watermark_txt = `${formateTime()}`
}
var defaultSettings = {
  //watermark_txt: window.parent.waterMark,
  // watermark_img: "",
  watermark_txt,
  watermark_x: 0, //水印起始位置x轴坐标
  watermark_y: 0, //水印起始位置Y轴坐标
  watermark_rows: 16, //水印行数
  watermark_cols: 16, //水印列数
  watermark_x_space: 100, //水印x轴间隔
  watermark_y_space: 100, //水印y轴间隔
  watermark_color: 'red', //水印字体颜色
  watermark_alpha: 0.3, //水印透明度
  watermark_fontsize: 12, //水印字体大小
  watermark_font: '微软雅黑', //水印字体
  watermark_width: 120, //水印宽度
  watermark_height: 60, //水印长度
  watermark_angle: 30 //水印倾斜度数
}
var oTemp = document.createDocumentFragment() //获取页面最大宽度
var page_width = parseInt(canvasWrapper.style.width) //获取页面最大长度
var page_height = parseInt(canvasWrapper.style.height) //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
if (
  defaultSettings.watermark_cols == 0 ||
  parseInt(
    defaultSettings.watermark_x +
      defaultSettings.watermark_width * defaultSettings.watermark_cols +
      defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)
  ) > page_width
) {
  defaultSettings.watermark_cols = parseInt(
    (page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space)
  )
  defaultSettings.watermark_x_space = parseInt(
    (page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1)
  )
} //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
if (
  defaultSettings.watermark_rows == 0 ||
  parseInt(
    defaultSettings.watermark_y +
      defaultSettings.watermark_height * defaultSettings.watermark_rows +
      defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)
  ) > page_height
) {
  defaultSettings.watermark_rows = parseInt(
    (defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space)
  )
  defaultSettings.watermark_y_space = parseInt(
    (page_height - defaultSettings.watermark_y - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1)
  )
}
var x
var y
for (var i = 0; i < defaultSettings.watermark_rows; i++) {
  y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
  for (var j = 0; j < defaultSettings.watermark_cols; j++) {
    x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j

    var mask_div = document.createElement('div')
    var mask_img = document.createElement('img')
    mask_div.id = 'mask_div' + i + j
    mask_div.className = 'mask_div'
    mask_img.className = 'mask_img'
    mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt))
    mask_img.src = defaultSettings.watermark_img //设置水印div倾斜显示
    //注意看这里加了图片水印
    if (defaultSettings.watermark_img == '' || !defaultSettings.watermark_img) {
      mask_div.remove(mask_img)
    } else {
      mask_div.append(mask_img)
    }
    mask_div.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
    mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
    mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
    mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
    mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
    mask_div.style.visibility = ''
    mask_div.style.position = 'absolute' //奇偶行错开，这样水印就不对齐，显的不呆板
    if (i % 2 != 0) {
      mask_div.style.left = x + 100 + 'px'
    } else {
      mask_div.style.left = x + 'px'
    }
    mask_div.style.top = y + 'px'
    mask_div.style.overflow = 'hidden'
    mask_div.style.opacity = defaultSettings.watermark_alpha
    mask_div.style.fontSize = defaultSettings.watermark_fontsize
    mask_div.style.fontFamily = defaultSettings.watermark_font
    mask_div.style.color = defaultSettings.watermark_color
    mask_div.style.textAlign = 'center'
    mask_div.style.width = defaultSettings.watermark_width + 'px'
    mask_div.style.height = defaultSettings.watermark_width + 'px'
    mask_img.style.width = defaultSettings.watermark_width + 'px'
    mask_img.style.height = defaultSettings.watermark_height + 'px' //这里可以控制水印大小 // mask_div.style.zIndex = '-99';
    mask_div.style.display = 'block'
    oTemp.appendChild(mask_div)
  }
}
cover.appendChild(oTemp) //这里结束
if (this.annotationLayer && this.annotationLayer.div) {
  div.insertBefore(textLayerDiv, this.annotationLayer.div) //水印
  div.appendChild(cover)
} else {
  div.appendChild(textLayerDiv) //水印
  div.appendChild(cover)
}

if (this.annotationLayer?.div) {
  div.insertBefore(textLayerDiv, this.annotationLayer.div)
} else {
  div.appendChild(textLayerDiv)
} //水印
var cover = document.getElementsByClassName('cover')
for (var i = 0, len = cover.length; i < len; i++) {
  cover[i].style.width = canvasWrapper.style.width
  cover[i].style.height = canvasWrapper.style.height
} //加水印结束

//==================================/* 禁用保存、复制粘贴 */==================================
// 在 viewe.html > body内容最后加入<script>，其中放入👇🏻代码
// 直接禁用右键
document.oncontextmenu = function (ev) {
  return false //阻止默认事件
} // 禁止复制粘贴
document.oncopy = function (ev) {
  return false //阻止默认事件
}
document.oncut = function (ev) {
  return false //阻止默认事件
}
