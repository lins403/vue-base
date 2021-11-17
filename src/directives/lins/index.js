import inputFilter from './input-filter'
import debounce from './debounce'
import throttle from './throttle'

const install = function (Vue) {
  Vue.directive('inputFilter', inputFilter)
  Vue.directive('debounce', debounce)
  Vue.directive('throttle', throttle)
}

if (window.Vue) {
  // window['inputFilter'] = inputFilter
  Vue.use(install) // eslint-disable-line
}

export default install
