function serialize(form) {
  let parts = []
  let optValue
  for (let field of form.elements) {
    switch (field.type) {
      case 'select-one':
      case 'select-multiple':
        if (field.name.length) {
          for (let option of field.options) {
            if (option.selected) {
              if (option.hasAttribute) {
                optValue = option.hasAttribute('value') ? option.value : option.text
              } else {
                optValue = option.attributes['value'].specified ? option.value : option.text
              }
              parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
            }
          }
        }
        break

      case undefined: // 字段集
      case 'file': // 文件输入
      case 'submit': // 提交按钮
      case 'reset': // 重置按钮
      case 'button': // 自定义按钮
        break

      case 'radio': // 单选按钮
      case 'checkbox': // 复选框
        if (!field.checked) {
          break
        }

      // eslint-disable-next-line no-fallthrough
      default:
        // 不包含没有名字的表单字段
        if (field.name.length) {
          parts.push('${encodeURIComponent(field.name)}=' + '${encodeURIComponent(field.value)}')
        }
    }
    return parts.join('&')
  }
}
