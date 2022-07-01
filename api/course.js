export default class Courses {
  constructor (axios, ctx) {
    this._axios = axios
    this._ctx = ctx
  }

  lsits (params) {
    return this._axios.$get('/courses', {
      params
    })
  }

  fundraising () {
    return this._axios.$get('/courses/fundraising')
  }
}
