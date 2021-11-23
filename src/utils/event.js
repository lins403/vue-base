//--------------------------------------------/* sleep */--------------------------------------------
export const sleep = interval => {
  return new Promise(resolve => {
    setTimeout(resolve, interval)
  })
}

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

//--------------------------------------------/* curry */--------------------------------------------
export const curry = (fn, ...args) => (fn.length <= args.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args))

const add = (x, y, z) => x + y + z
const addMore = curry(add)
console.log(addMore(1, 2, 3), addMore(1, 2)(3), addMore(1)(2)(3), addMore(1)(2, 3))

//--------------------------------------------/* createEventHub */--------------------------------------------
/**
 * from https://www.30secondsofcode.org/js/s/create-event-hub
 * @description: 发布-订阅
 * @param {*}
 * @return {*}
 */
export const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    ;(this.hub[event] || []).forEach(handler => handler(data))
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler)
    if (i > -1) this.hub[event].splice(i, 1)
    if (this.hub[event].length === 0) delete this.hub[event]
  }
})

//--------------------------------------------/* debouncePromise */--------------------------------------------
/**
 * from https://www.30secondsofcode.org/js/s/debounce-promise
 * @description: 多个不同Promise的节流效果
 * @param {*}
 * @return {*}
 */
const debouncePromise = (fn, ms = 0) => {
  let timeoutId
  const pending = []
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentPending = [...pending]
        pending.length = 0
        Promise.resolve(fn.apply(this, args)).then(
          data => {
            currentPending.forEach(({ resolve }) => resolve(data))
          },
          error => {
            currentPending.forEach(({ reject }) => reject(error))
          }
        )
      }, ms)
      pending.push({ resolve: res, reject: rej })
    })
}
const fn = arg =>
  new Promise(resolve => {
    // setTimeout(function[, delay, arg1, arg2, ...])
    setTimeout(resolve, 1000, ['resolved', arg])
  })
const debounced = debouncePromise(fn, 200)
debounced('foo').then(console.log)
debounced('bar').then(console.log)
// Will log ['resolved', 'bar'] both times（设定的ms为0时依然如此）
