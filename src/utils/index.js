import { cached } from './event'

/* eslint-disable no-unused-vars */
const utilsObj = {
  name: '',
  init: function () {},
  getName: function () {},
  setName: function (name) {
    this.name = name
  }
}
// export default { utilObj }

//--------------------------------------------/*  */--------------------------------------------

/**
 * https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 * @description: 通用工具类
 * @param {*}
 * @return {*}
 */
export default class SharedUtils {
  static emptyObject = Object.freeze({})
  _toString = Object.prototype.toString

  // 不能被实例使用，但可以被子类继承
  static noop(a, b, c) {}

  static isUndef(v) {
    return v === undefined || v === null
  }
  static isDef(v) {
    return v !== undefined && v !== null
  }

  static isObject(obj) {
    return obj !== null && typeof obj === 'object'
  }

  static isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean'
  }

  static toRawType(value) {
    return this._toString.call(value).slice(8, -1)
  }

  static isPromise(val) {
    return SharedUtils.isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'
  }

  static toString(val) {
    return val == null
      ? ''
      : Array.isArray(val) || (SharedUtils.isPlainObject(val) && val.toString === this._toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
  }

  static toNumber(val) {
    const n = parseFloat(val)
    return isNaN(n) ? val : n
  }

  /**
   * @description: Camelize a hyphen-delimited string.
   * @param {string} str
   * @return {string}
   */
  static camelize = cached(str => {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  })

  /**
   * @description: Capitalize a string.
   * @param {string} str
   * @return {string}
   */
  static capitalize = cached(str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })

  /**
   * @description: Hyphenate a camelCase string.
   * @param {string} str
   * @return {string}
   */
  static hyphenate = cached(str => {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  })

  /**
   * @description: Check if two values are loosely equal - that is, if they are plain objects, do they have the same shape?
   * @param {any} a
   * @param {any} b
   * @return {*}
   */
  static looseEqual(a, b) {
    looseEqual(a, b)
  }

  /**
   * @description:  Make a map and return a function for checking if a key is in that map.【可以用于函数柯里化】
   * @param {string} str
   * @param {boolean} expectsLowerCase
   * @return {true | void}
   */
  static makeMap(str, expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
  }
}
//--------------------------------------------/*  */--------------------------------------------

function looseEqual(a, b) {
  if (a === b) return true
  const isObjectA = SharedUtils.isObject(a)
  const isObjectB = SharedUtils.isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i])
          })
        )
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key])
          })
        )
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
