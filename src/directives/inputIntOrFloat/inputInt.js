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
      let newValue = input.value.replace(/[^\d]/g, '')
      if (newValue) {
        switch (binding.value) {
          case 'zeroBefore':
            break // 数字随意输，不做处理，如 000013
          case 'zeroCan':
            newValue = Number(newValue).toString() // 去掉开头0 正整数 + 0
            break
          default:
            newValue = newValue.replace(/^\b(0+)/gi, '') // （默认）去掉开头0 正整数
        }
      }
      // 判断是否需要更新，避免进入死循环
      if (newValue !== oldValue) {
        input.value = newValue
        // 通知v-model更新 vue底层双向绑定实现的原理是基于监听input事件
        input.dispatchEvent(new Event('input'))
      }
    })
  }
}
