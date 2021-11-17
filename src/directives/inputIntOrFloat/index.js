import inputInt from './inputInt'
import inputFloat from './inputFloat'

const install = function (Vue) {
  Vue.directive('inputInt', inputInt)
  Vue.directive('inputFloat', inputFloat)
}

if (window.Vue) {
  window['inputInt'] = inputInt
  window['inputFloat'] = inputFloat
  Vue.use(install) // eslint-disable-line
}

export default install
