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
//--------------------------------------------/*  */--------------------------------------------

/**
 * @param {Object} obj
 * @return {boolean}
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
//--------------------------------------------/*  */--------------------------------------------

/**
 * @description: Check if val is a valid array index.
 * @param {*} val
 * @return {*}
 */
export function isValidArrayIndex(val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
//--------------------------------------------/*  */--------------------------------------------

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
//--------------------------------------------/*  */--------------------------------------------

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
//--------------------------------------------/*  */--------------------------------------------

/**
 * @description: Merge an Array of Objects into a single Object.
 * @param {Array<any>} arr
 * @return {Object}
 */
export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
//--------------------------------------------/*  */--------------------------------------------
