export default class Profile {
  constructor (axios, ctx) {
    this._axios = axios
    this._ctx = ctx
  }

  me () {
    return this._axios.$get('/me')
  }
}
