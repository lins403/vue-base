//==================================/* 纯JS导出text文件 */==================================
export function original_download(arrData, fileName) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(arrData, null, 2)], {
      type: 'text/plain'
    })
  )
  a.setAttribute('download', fileName)
  a.click()
  a.remove()
}
// 导出JSON会导致带有转义符，所以改用file-saver来导出JstopPropagation();
// "{\"title\":\"Professional JavaScript\",\"edition\":3}"
