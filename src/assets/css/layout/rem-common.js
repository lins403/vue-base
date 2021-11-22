/**
 * @description: 基于缩放比设计rem，例如设置成100px，pxTorem()的参数需要针对100px进行换算
 */
;(function (win) {
  var doc = win.document
  var docEl = doc.documentElement
  var tid

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    if (width > 768) {
      // 最大宽度
      width = 768
    }
    var rem = width / 7.68
    docEl.style.fontSize = rem + 'px'
  }
  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    },
    false
  )
  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )
  refreshRem()
})(window)
