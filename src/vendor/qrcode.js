// https://github.com/soldair/node-qrcode
// https://www.npmjs.com/package/qr.js
// https://github.com/scopewu/qrcode.vue

import QRCode from 'qrcode'

// With async/await
export const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}
