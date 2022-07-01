export const state = () => ({
  config: {
    method: '',
    url: '',
    params: '',
    data: ''
  },
  errorRep: {},
  times: 0
})

export const getters = {
  config (state) {
    return Object.assign({}, state.config)
  },
  errorRep (state) {
    return state.errorRep
  },
  times (state) {
    return state.times
  }
}

export const mutations = {
  SET_CONFIG (state, config) {
    state.config = config
  },
  SET_ERROR_REP (state, errorRep) {
    state.errorRep = errorRep
  },
  SET_TIMES (state, times) {
    state.times = times
  }
}
