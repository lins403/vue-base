/* eslint-disable no-unused-vars */
export default {
  bind(el, binding, vnode) {
    const input = vnode.elm.children[0]
    input.addEventListener('compositionstart', () => {
      vnode.inputLocking = true
    })
    input.addEventListener('compositionend', () => {
      vnode.inputLocking = false
      input.dispatchEvent(new Event('input'))
    })
    input.addEventListener('input', () => {
      if (vnode.inputLocking) {
        return
      }
      const oldValue = input.value
      // ************************************************************************/
      let newValue = oldValue
      let regularExp
      // 限定 input 最大输入长度
      const maxLength = Number(Object.keys(binding.modifiers).slice(-1)) || 24
      // console.log(vnode.data.model.expression)
      switch (binding.arg) {
        case 'replace':
          // v-input-filter:replace="/[^\u4E00-\u9FA5|\w]/g"
          // 符合正则匹配的被替换
          newValue = newValue.replace(binding.value, '')
          break
        case 'regular':
          // v-input-filter:regular.3="/[\u4E00-\u9FA5]/g"
          // v-input-filter:regular="/^\w+$/g"
          // 不符合的被替换
          var originReg = new RegExp(binding.value)
          var source = originReg.source
          var flags = originReg.flags
          if (source.startsWith('^') || source.endsWith('$')) {
            source = source.replace(/\^(.*)\$/g, '(?=$1).')
            flags = flags.includes('g') || flags + 'g'
          } else if (source.search(/^\[.*\]$/) > -1) {
            source = source.replace(/^(\[.*\])$/, '(?=$1).')
          }
          regularExp = new RegExp(source, flags)
          var result = newValue.match(regularExp) || []
          newValue = result.join('')
          break
        case 'number':
          // v-input-filter:number.int
          // v-input-filter:number.float
          newValue = newValue.replace(/[^\d]/g, '')
          if (newValue) {
            // eslint-disable-next-line no-case-declarations
            const numberModifiers = Object.keys(binding.modifiers)
            if (numberModifiers.length === 0) {
              void 0
            } else if (numberModifiers.includes('int')) {
              switch (binding.value) {
                case 'zeroBefore':
                  break // 数字随意输，不做处理，如 000013
                case 'zeroCan':
                  newValue = Number(newValue).toString() // 去掉开头0 正整数，保留0
                  break
                default:
                  newValue = newValue.replace(/^\b(0+)/gi, '') // （默认）去掉开头0 正整数
              }
            } else if (numberModifiers.includes('float')) {
              newValue = input.value.replace(/[^\d.]/g, '')
              newValue = newValue.replace(/^\./g, '')
              newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
              newValue = newValue.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
              if (newValue) {
                const arr = newValue.split('.')
                newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]) // 去掉开头多余的0
              }
            }
          }
          break
        default:
          newValue = oldValue
      }
      newValue = newValue.replace(new RegExp(`(.{${maxLength}}).*`, 'g'), '$1')
      // ************************************************************************/
      // 判断是否需要更新，避免进入死循环
      if (newValue !== oldValue) {
        input.value = newValue
        // 通知v-model更新 vue底层双向绑定实现的原理是基于监听input事件
        input.dispatchEvent(new Event('input'))
      }
    })
  },
  inserted(el, binding, vnode, oldVnode) {
    const input = vnode.elm.children[0]
    input.addEventListener('input', () => {
      if (binding.arg === 'validatorReg') {
        // v-input-filter:validatorReg="{ code:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/, message:'请设置8-16位密码，需包含数字/大写字母/小写字母/特殊符号4种组合' }"
        // 被验证的正则匹配，验证失败直接用elementUI的样式
        elementValidateError(el, input.value, binding.value)
      }
    })
  }
}

function elementValidateError(el, newValue, userBinding) {
  const inputErrorClass = 'is-regular-error'
  const messageErrorClass = 'el-form-item__error'
  try {
    if (newValue && newValue.search(userBinding.code) === -1) {
      if (!el.classList.contains(inputErrorClass)) el.classList.add(inputErrorClass)
      if (el.parentNode.children.length === 1) {
        const divNode = document.createElement('div')
        divNode.setAttribute('class', messageErrorClass)
        divNode.appendChild(document.createTextNode(userBinding.message))
        el.parentNode.appendChild(divNode)
      }
    } else {
      el.classList.remove(inputErrorClass)
      // let divNode = el.parentNode.getElementsByClassName(messageErrorClass)  // HTMLCollection 也是这个class，会导致removeChild错误
      if (el.parentNode.children.length > 1) el.parentNode.removeChild(el.parentNode.lastChild)
    }
    // <div class="el-form-item__error">格式错误</div>
  } catch (error) {
    if (error instanceof TypeError) {
      console.warn('正则表达式不正确')
    }
    console.log(error)
  }
}

//--------------------------------------------/*  */--------------------------------------------

// <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
// name: "demo"
// value: "hello!"
// expression: "message"
// arg: "foo"
// modifiers: {"a":true,"b":true}

// (1) regular
// (2) number.int
// (3) number.float
// (4) maxlength
