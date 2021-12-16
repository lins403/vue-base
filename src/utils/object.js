//--------------------------------------------/* deepClone */--------------------------------------------
/**
 * This is just a simple version of deep copy that has a lot of edge cases bug.
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep.
 * https://www.npmjs.com/package/lodash.clonedeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  // return JSON.parse(JSON.stringify(source))
  return targetObj
}

//--------------------------------------------/* isObject */--------------------------------------------
/**
 * @param {*} obj
 * @return {boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

//--------------------------------------------/* isPlainObject */--------------------------------------------
/**
 * @param {Object} obj
 * @return {boolean}
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

//--------------------------------------------/* isValidArrayIndex */--------------------------------------------
/**
 * @description: Check if val is a valid array index.
 * @param {*} val
 * @return {*}
 */
export function isValidArrayIndex(val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

//--------------------------------------------/* removeItem <Array> */--------------------------------------------
/**
 * @description: Remove an item from an array.
 * @param {Array} arr
 * @param {String} item
 * @return {Array}
 */
export function removeItem(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

//--------------------------------------------/* extend */--------------------------------------------
/**
 * @description: Mix properties into target object.
 * @param {*} to
 * @param {*} _from
 * @return {*}
 */
export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

//--------------------------------------------/* deepFlatten <Array> */--------------------------------------------
/**
 * @description: 递归扁平化数组
 * @param {Array} arr
 * @return {Array}
 */
export const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))

/* 单层扁平化数组 */
export const singleFlatten = arr => [].concat(...arr)

export const objFlatten = arr => arr.reduce((pv, cv) => Object.assign(pv, cv))
// objFlatten([{a:1},{a:2,b:3},{'hello':true}])  //{a: 2, b: 3, hello: true}

//--------------------------------------------/* obj2url */--------------------------------------------
/**
 * @description: obj => urlparams
 * @param {Object} obj
 * @return {String}
 */
export const obj2url = obj =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')
