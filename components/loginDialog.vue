<template>
  <div class="login-page">
    <div
      v-if="loginDialog"
      class="
        overflow-y-auto
        fixed
        top-0
        right-0
        left-0
        z-30
        w-full
        md:inset-0
        h-modal
        md:h-full
        h-screen
        justify-center
        items-center
        flex
        login-overly
      "
    >
      <div
        class="
          xl:w-1/4
          lg:w-1/2
          w-full
          h-auto
          m-4
          bg-white
          modal-dialog
          rounded-xl
        "
      >
        <div class="modal-content shadow-md bg-cover login-bg rounded-xl">
          <div
            class="
              relative
              modal-header
              flex flex-shrink-0
              items-center
              justify-center
              p-7
              pt-10
            "
          >
            <div class="flex">
              <img
                :src="require('~/assets/img/logo-hiskio.svg')"
                class="
                  h-full
                  w-28
                  bg-contain bg-center bg-no-repeat
                  min-md:mr-10px min-md:block min-md:w-100px
                "
                alt="logo-hisk"
              >
            </div>
            <button
              type="button"
              class="
                absolute
                top-5
                right-5
                box-content
                text-gray-900
                border-none
                rounded-none
              "
              @click="$store.commit('SET_LOGIN_DIALOG', false)"
            >
              <svg
                class="h-6 w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="modal-body relative p-7 pt-1">
            <div class="flex justify-around">
              <div
                class="flex mx-1 text-2xl font-bold cursor-pointer pb-2"
                :class="{
                  'text-primary border-b-4 border-primary': area === 'login',
                  'text-gray-300': area !== 'login',
                }"
                @click="area = 'login'"
              >
                <h1>登入</h1>
              </div>
              <div
                class="flex mx-1 text-2xl font-bold cursor-pointer pb-2"
                :class="{
                  'text-primary border-b-4 border-primary': area === 'signIn',
                  'text-gray-300': area !== 'signIn',
                }"
                @click="area = 'signIn'"
              >
                <h1>註冊</h1>
              </div>
            </div>
            <div
              class="mx-auto mt-6 flex flex-col items-center justify-between"
            >
              <button
                v-for="(loginBtn, lIdx) in btnLists"
                :key="`loginBtn-${lIdx}`"
                type="button"
                class="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-gray-600
                  hover:bg-gray-50
                  border border-gray-300
                  py-3
                  mb-3
                "
              >
                <img :src="loginBtn.img" class="mr-2" :alt="loginBtn.name">
                <span class="text-base"> 使用 {{ loginBtn.name }} 登入 </span>
              </button>
              <p class="py-6 font-bold text-gray-600">
                使用 HiSKIO ID 登入
              </p>
              <form class="w-full">
                <label class="relative block">
                  <span class="sr-only">Acount</span>
                  <span
                    class="
                      absolute
                      inset-y-0
                      left-0
                      flex
                      items-center
                      text-gray-400
                    "
                  >
                    <svg
                      class="h-6 w-6 mx-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <input
                    v-model="account"
                    class="
                      placeholder:italic
                      block
                      w-full
                      rounded-md
                      pl-10
                      py-2
                      outline-none
                      bg-gray-100
                    "
                    placeholder="請輸入 HiSKIO ID"
                    type="text"
                    name="username"
                    autocomplete="username"
                  >
                </label>
                <label class="relative block mt-3">
                  <span class="sr-only">Acount</span>
                  <span
                    class="
                      absolute
                      inset-y-0
                      left-0
                      flex
                      items-center
                      text-gray-400
                    "
                  >
                    <svg
                      class="h-6 w-6 mx-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="password"
                    class="
                      placeholder:italic
                      block
                      w-full
                      rounded-md
                      pl-10
                      py-2
                      outline-none
                      bg-gray-100
                    "
                    placeholder="請輸入登入密碼"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                  >
                </label>
              </form>
              <div class="flex items-center w-full my-5">
                <input
                  type="checkbox"
                  value=""
                  class="
                    w-4
                    h-4
                    text-gray-600
                    border-gray-300
                    rounded
                    bg-gray-500
                    ml-1
                  "
                >
                <label class="text-sm font-medium text-gray-500 pl-1">
                  登入註冊即代表您同意
                  <span class="underline underline-offset-1">
                    使用者及隱私權政策
                  </span>
                </label>
              </div>
              <button
                type="button"
                class="
                  w-full
                  text-white
                  bg-primary
                  font-medium
                  rounded-md
                  text-md
                  py-2
                  mb-6
                "
                @click="login"
              >
                登入
              </button>
              <a class="text-gray-500"> 忘記密碼 </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginDialog',
  data () {
    return {
      account: '',
      password: '',
      area: 'login',
      btnLists: [
        {
          name: 'Facebook',
          img: require('~/assets/img/icon-facebook.svg')
        },
        {
          name: 'Google',
          img: require('~/assets/img/icon-google.svg')
        },
        {
          name: 'Github',
          img: require('~/assets/img/icon-github.svg')
        },
        {
          name: 'Linkedin',
          img: require('~/assets/img/icon-linkedin.svg')
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loginDialog: 'loginDialog'
    })
  },
  methods: {
    async login () {
      const form = {
        account: this.account,
        password: this.password,
        confirm: true
      }
      if (form.account && form.password) {
        const data = await this.$api.auth.login(form)
        if (!data.errorCode) {
          this.$toast.global.success('已成功登入')
          this.$store.commit('auth/SET_TOKEN_INFO', {
            accessToken: data.accessToken,
            expiresIn: data.expiresIn
          })

          this.$cookies.set('_ua', form.account)
          this.$cookies.set('_up', form.password)

          this.$cookies.set('user-accessToken', data.accessToken)
          this.$cookies.set('user-expiresIn', data.expiresIn)
          await this.$store.dispatch('profile')
          this.$store.commit('SET_LOGIN_DIALOG', false)
        }
      } else {
        this.$toast.global.error('請輸入帳號密碼')
      }
    }
  }
}
</script>

<style lang="scss">
.login-page {
  .login-bg {
    background-image: url("~/assets/img/login.png");
  }
  .login-overly {
    background: #000000b3;
  }
}
</style>
