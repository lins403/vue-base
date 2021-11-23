import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

// Serialize
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// Deserialize
export const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
parseCookie('foo=bar; equation=E%3Dmc%5E2') // { foo: 'bar', equation: 'E=mc^2' }
