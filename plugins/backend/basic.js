const extendAxiosInstance = (axios) => {
  const axiosExtra = {
    onRequest (fn) {
      axios.interceptors.request.use(config => fn(config) || config)
    },
    onResponse (fn) {
      axios.interceptors.response.use(response => fn(response) || response)
    },
    onRequestError (fn) {
      axios.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
    },
    onResponseError (fn) {
      axios.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
    },
    onError (fn) {
      axios.onRequestError(fn)
      axios.onResponseError(fn)
    }
  }

  // Request helpers ($get, $post, ...)
  for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
    axiosExtra['$' + method] = function () { return axios[method].apply(axios, arguments).then(res => res && res.data) }
  }
  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

const setupProgress = (axios) => {
  if (process.server) {
    return
  }

  // A noop loading inteterface for when $nuxt is not yet ready
  const noopLoading = {
    finish: () => { },
    start: () => { },
    fail: () => { }
  }

  const $loading = () => (window.$nuxt && window.$nuxt.$loading && window.$nuxt.$loading.set) ? window.$nuxt.$loading : noopLoading

  let currentRequests = 0

  axios.onRequest((config) => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++

    $loading().start()
  })

  axios.onResponse((response) => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError((error) => {
    if (error && error.config && error.config.progress === false) {
      return
    }

    currentRequests--
    $loading().finish()
  })

  const onProgress = (e) => {
    if (!currentRequests) {
      return
    }
    const progress = ((e.loaded * 100) / (e.total * currentRequests))
    $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
}

export {
  extendAxiosInstance,
  setupProgress
}
