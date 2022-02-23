// node_modules/element-ui/packages/message/src/main.js
import { Message } from 'element-ui'
import { isPlainObject, hasOwn } from './object'
import SharedUtils from './index'

//==================================/* SingletonMessage <element-ui> */==================================
// let _messageInstance = null
// export function SingletonMessage(options) {
//   // 最多创建一条消息实例
//   // if (!_messageInstance) _messageInstance = Message(options)

//   // 最多同时存在一条消息
//   if (_messageInstance) {
//     _messageInstance.close()
//   }
//   _messageInstance = Message(options)
// }

/**
 * @description: element-ui最多允许存在一条message
 * @param {Object | string} options
 * @return {void}
 */
export const SingletonMessage = (function () {
  let _messageInstance = null

  return function (options) {
    if (_messageInstance) _messageInstance.close()
    _messageInstance = Message(options)
  }
})()
;['success', 'warning', 'info', 'error'].forEach(type => {
  SingletonMessage[type] = options => {
    if (isPlainObject(options) && !isVNode(options)) {
      return SingletonMessage({ ...options, type })
    }
    return SingletonMessage({ type, message: options })
  }
})
export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

//==================================/* isHTMLTag */==================================
/**
 * @description:
 * @param {*}
 * @return {*}
 */
export const isHTMLTag = SharedUtils.makeMap(
  'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
)

//==================================/* currentScreenSize */==================================
export const currentScreenSize = () => {
  const width =
    window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
  return width >= 1200 ? 'xl' : width >= 992 ? 'lg' : width >= 768 ? 'md' : 'sm'
}

//==================================/*  */==================================
export const createElement = str => {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
// const el = createElement(
//   `<div class="container">
//     <p>Hello!</p>
//   </div>`
// );
// const divNode = document.createElement('div')
// divNode.innerHTML = 'hello world'
// document.body.appendChild(divNode)

//============================================/*  */============================================
export const createClassElement = className => {
  const el = document.createElement('div')
  el.classList.add(className)
  document.body.appendChild(el)
}

//==================================/*  */==================================
export const insertImage = (dataUrl, aimNode, urlParams) => {
  let newImg = document.createElement('img')
  newImg = Object.assign(newImg, { src: dataUrl, ...urlParams })
  aimNode.appendChild(newImg)
}
// eslint-disable-next-line no-undef
insertImage(canvas.toDataURL(), document.body, {
  width: 200
})

//============================================/*  */============================================
export function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '&quot;'
    }
  })
}
console.log(htmlEscape('<p class="greeting">Hello world!</p>'))
// '&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;'
