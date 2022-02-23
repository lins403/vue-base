//==================================/* parseTimeFormat */==================================
/**
 * @description: 按格式解析为时间字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @return {string | null}
 */
export function parseTimeFormat(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

//==================================/* instantMessageTime */==================================
/**
 * @description: 适用于即时聊天的时间格式化
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function instantMessageTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTimeFormat(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

//==================================/* npm libraries */==================================
// 相关库
// https://www.npmjs.com/package/moment     290.1K(gizpped: 72.3K)  【支持的语言太多，可以通过webpack优化体积】
// https://www.npmjs.com/package/date-fns   21.2K(gizpped: 5.9K) 【支持模块化引用，比dayjs更适合复杂的应用场景】
// https://www.npmjs.com/package/dayjs      6.8K(gizpped: 3K)【链式，同momentjs风格，轻量，而一些拓展功能需要再手动extend插件】 https://dayjs.gitee.io/docs/zh-CN/installation/node-js
// https://how-to.dev/dayjs-vs-date-fns
/**
 *  1. 时间解析（格式化）
 *  2. 时间的getter和setter
 *  3. 操作（如增加减少天数等等）
 *  4. 查询（如是否时间对象，是否闰年）
 *  5. i18n
 */
