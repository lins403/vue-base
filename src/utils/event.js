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
//--------------------------------------------/*  */--------------------------------------------

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
