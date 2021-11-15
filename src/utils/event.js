//--------------------------------------------/* once */--------------------------------------------
/**
 * @description: Ensure a function is called only once.
 * @param {Function} fn
 * @return {*}
 */
export const once = function (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

//--------------------------------------------/* cached */--------------------------------------------
/**
 * @description: Create a cached version of a pure function.
 * @param {Function} fn
 * @return {Function}
 */
export function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

//--------------------------------------------/* errorHandler */--------------------------------------------
/**
 * @description: 捕获函数运行异常
 * @param {*}
 * @return {*}
 */
export const errorHandler = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}
