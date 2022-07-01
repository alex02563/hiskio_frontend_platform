export default class Auth {
  constructor (axios, ctx) {
    this._axios = axios
    this._ctx = ctx
  }

  login ({
    account,
    password
  }) {
    return this._axios.$post('/auth/login', {
      account,
      password,
      confirm: true
    })
  }
}
