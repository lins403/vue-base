/* eslint-disable */
// https://github.com/vuejs/vue/blob/e78568ec20f7b34bbf655231df49b438c6279dbd/src/core/util/env.js

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

export const isNode = typeof process !== 'undefined' && !!process.versions && !!process.versions.node
