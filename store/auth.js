export const state = () => ({
  accessToken: '',
  tokenType: 'Bearer',
  expiresIn: 0
})

export const getters = {
  accessToken (state) {
    return state.accessToken
  },
  tokenType (state) {
    return state.tokenType
  },
  expiresIn (state) {
    return state.expiresIn
  }
}

export const mutations = {
  SET_TOKEN_INFO (state, { accessToken, expiresIn }) {
    state.accessToken = accessToken
    state.expiresIn = expiresIn
  }
}

export const actions = {
  async refresh ({ commit }) {
    // 以緩存明碼方式代替token延長時效刷新
    const account = this.$cookies.get('_ua')
    const password = this.$cookies.get('_up')
    const data = await this.$api.auth.login({
      account,
      password,
      confirm: true
    })
    if (!data.errorCode) {
      commit('SET_TOKEN_INFO', {
        accessToken: data.accessToken,
        expiresIn: data.expiresIn
      })

      this.$cookies.set('user-accessToken', data.accessToken)
      this.$cookies.set('user-expiresIn', data.expiresIn)
    }
  }
}
