import Axios from 'axios'
import Qs from 'qs'
import camelcaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'
import formData from 'form-data'
import { extendAxiosInstance, setupProgress } from './basic'

import Course from '~/api/course'
import Auth from '~/api/auth'
import Profile from '~/api/profile'
import Carts from '~/api/carts'

export default (ctx, inject) => {
  // baseURL
  const baseURL = 'https://api.hiskio.com/v2'

  const headers = {
    common: {
      Accept: 'application/json, text/plain, */*, application/json, text/plain, */*'
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {}
  }

  const paramsSerializer = (params) => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }

  const axiosOptions = {
    baseURL,
    headers,
    paramsSerializer
  }

  // Proxy SSR request headers headers
  axiosOptions.headers.common = (ctx.req && ctx.req.headers) ? Object.assign({}, ctx.req.headers) : {}
  delete axiosOptions.headers.common.accept
  delete axiosOptions.headers.common.host
  delete axiosOptions.headers.common['cf-ray']
  delete axiosOptions.headers.common['cf-connecting-ip']

  if (process.server) {
    // Don't accept brotli encoding because Node can't parse it
    axiosOptions.headers.common['Accept-Encoding'] = 'gzip, deflate'
    axiosOptions.headers.common['ho-forwarded-for'] = ctx.req.headers['x-forwarded-for']
  }

  // Create new axios instance
  const axios = Axios.create(axiosOptions)

  // Extend axios proto
  extendAxiosInstance(axios)

  // Setup interceptors
  setupProgress(axios)

  axios.onRequest((req) => {
    if (req.url === '/auth/login') {
      delete req.headers.common.authorization
    } else if (ctx.store.getters['auth/accessToken'] && ctx.store.getters['auth/accessToken'].length > 0) {
      req.headers.common.authorization = `${ctx.store.getters['auth/tokenType']} ${ctx.store.getters['auth/accessToken']}`
      req.headers.authorization = `${ctx.store.getters['auth/tokenType']} ${ctx.store.getters['auth/accessToken']}`
    }

    if (req.data && typeof req.data === 'object' && !(req.data instanceof formData)) {
      req.data = snakeCaseKeys(req.data)
    }

    if (req.params && typeof req.params === 'object') {
      req.params = snakeCaseKeys(req.params)
    }

    return req
  })

  axios.onResponse((resp) => {
    if (resp.data && typeof resp.data === 'object') {
      resp.data = camelcaseKeys(resp.data, { deep: true })
    }
    return resp
  })

  axios.onResponseError(async (err) => {
    ctx.store.commit('api/SET_ERROR_REP', camelcaseKeys(err.response, { deep: true }))
    // id-token不符
    if (err.config && err.response.data.error_code === '403000' && err.config.url !== '/auth/login') {
      const config = Object.assign({}, ctx.store.getters['api/config'])
      await ctx.store.dispatch('auth/refresh')
      return axios.request(config)
    } else {
      ctx.error({
        statusCode: err.response.status,
        message: err.response.data.error_msg,
        errorCode: err.response.data.error_code,
        options: err.response.data.options
      })
    }
  })

  const api = {
    course: new Course(axios, ctx),
    auth: new Auth(axios, ctx),
    profile: new Profile(axios, ctx),
    carts: new Carts(axios, ctx)
  }

  inject('api', api)
}
