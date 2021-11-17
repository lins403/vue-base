var _debounce = require('lodash/debounce')
// debounce(func, [wait=0], [options={leading:false,trailing:true,maxWait:0}])
export default {
  inserted: (el, binding) => {
    const defaultWait = 100
    const eventName = binding.arg || 'click'
    const options = {
      leading: !!binding.modifiers.leading || true,
      trailing: !!binding.modifiers.trailing || false,
      maxWait: 0 // immediate
    }
    const wait = Number(Object.keys(binding.modifiers)[0]) || defaultWait
    el.addEventListener(eventName, _debounce(binding.value, wait, options))
  }
}

// <el-button v-debounce:click.500="refresh">刷新</el-button>
// <el-button v-debounce:click.500.trailing="refresh">刷新</el-button>
// <el-button v-debounce:click.500="refresh.bind(this,'okay')">刷新</el-button>
