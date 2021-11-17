import Clipboard from './clipboard'

const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install) // eslint-disable-line
}

Clipboard.install = install
export default Clipboard

// https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/clipboard/index.vue
