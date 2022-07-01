const originMe = {
  id: 0,
  username: '',
  avatar: '',
  thumbnails: {
    original: '',
    w800: '',
    w300: ''
  },
  description: '',
  birthday: '',
  account: '',
  realName: '',
  gender: '',
  email: '',
  emailVerified: false,
  bindPassword: false,
  profile: {
    facebook: '',
    google: '',
    linkedin: '',
    github: ''
  },
  roles: [],
  payoutPreferences: {
    realName: '',
    phone: '',
    address: '',
    email: '',
    alternateEmail: '',
    bankCode: '',
    bankBranchCode: '',
    bankAccount: '',
    account: '',
    taxId: ''
  },
  messages: {
    receivePlatformLatestEvents: false,
    receiveCoursePromotion: false,
    receiveQuestionnaire: false
  },
  privacies: {
    showBookmarkedCourses: false,
    showDiscussions: false,
    showCollectedCreations: false,
    showCreations: false
  },
  authMethod: '',
  oauth: [],
  questionnaire: false
}

export const state = () => ({
  loginDialog: false,
  me: originMe
})

export const getters = {
  me (state) {
    return state.me
  },
  isLogin (getters) {
    return getters.me.id !== 0
  },
  loginDialog (state) {
    return state.loginDialog
  }
}

export const mutations = {
  SET_ME (state, data) {
    state.me = data
  },
  SET_LOGIN_DIALOG (state, bool) {
    state.loginDialog = bool
  }
}

export const actions = {
  nuxtServerInit ({ commit, dispatch }) {
    // 刷新時重新獲取 store 值

    const accessToken = this.$cookies.get('user-accessToken')
    const expiresIn = this.$cookies.get('user-expiresIn')

    if (accessToken && expiresIn) {
      dispatch('auth/refresh') // 模擬延長login時效
      commit('auth/SET_TOKEN_INFO', {
        accessToken,
        expiresIn
      })
    }
  },
  async profile ({ commit }) {
    const profile = await this.$api.profile.me()
    if (!profile.errorCode) {
      commit('SET_ME', profile)
    }
  },
  logout ({ commit }) {
    this.$cookies.set('_ua', '')
    this.$cookies.set('_up', '')
    this.$cookies.set('user-accessToken', '')
    this.$cookies.set('user-expiresIn', '')
    commit('SET_ME', originMe)
  }
}
