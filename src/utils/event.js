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
    fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}

//--------------------------------------------/* timeTaken */--------------------------------------------
/**
 * @description: 同步函数运行时间统计
 */
export const timeTaken = callback => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}
const timeCost = (fn, ...args) => {
  const start = window.performance.now()
  const r = fn(...args)
  const end = window.performance.now()
  console.log('time cost => ', `${end - start}ms`)
  return r
}

console.log(timeTaken(() => Math.pow(2, 10))) //timeTaken: 0.01611328125 ms
console.log(timeCost(() => Math.pow(2, 10))) //time cost =>  0ms
