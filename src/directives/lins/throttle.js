/* eslint-disable no-unused-vars */
var _throttle = require('lodash/throttle')
// throttle(func, [wait=0], [options={leading:true,trailing:true}])
export default {
  inserted: (el, binding, vnode) => {
    const defaultWait = 100
    const eventName = binding.arg || 'click'
    const wait = Number(Object.keys(binding.modifiers)[0]) || defaultWait
    const options = {
      leading: true,
      trailing: false
    }
    // binding.value.bind(vnode.context)
    el.addEventListener(eventName, _throttle(binding.value, wait, options))
  }
}

// <el-button v-throttle:click.1000="login">登录</el-button>
// <el-button v-throttle:click.3000="login.bind(this, 123)">登录</el-button>
