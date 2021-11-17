import dialogDrag from './dialogDrag'
import dialogDragWidth from './dialogDragWidth'

const install = function (Vue) {
  Vue.directive('dialogDrag', dialogDrag)
  Vue.directive('dialogDragWidth', dialogDragWidth)
}

if (window.Vue) {
  window['dialogDrag'] = dialogDrag
  window['dialogDragWidth'] = dialogDragWidth
  Vue.use(install) // eslint-disable-line
}

export default install
