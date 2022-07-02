<template>
  <div>
    <header class="fixed top-0 z-30 h-14 w-full bg-white shadow-md">
      <div
        class="
          flex flex-wrap
          justify-between
          items-center
          h-full
          mx-auto
          px-2
          md:px-6
          text-gray-600
        "
      >
        <nuxt-link to="/">
          <img
            :src="require('~/assets/img/logo-hiskio.svg')"
            class="h-full w-24 bg-contain bg-center bg-no-repeat"
            alt="logo-hisk"
          >
        </nuxt-link>
        <a v-show="!isLogin" class="hidden md:flex mx-1">
          <img
            :src="require('~/assets/img/header-recruit.png')"
            class="
              h-full
              w-20
              bg-contain bg-center bg-no-repeat
              min-md:mr-10px min-md:block min-md:w-100px
            "
            alt="header-recruit"
          >
        </a>
        <div v-show="!isLogin" class="hidden md:flex mx-1">
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <div class="ml-1">
            課程
          </div>
        </div>
        <div class="flex-1 ml-3 mr-1">
          <label class="relative block">
            <span class="sr-only">Search</span>
            <span
              class="
                absolute
                inset-y-0
                left-0
                flex
                items-center
                pl-2
                text-gray-400
              "
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
                <path stroke="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </span>
            <input
              class="
                placeholder:italic
                block
                w-full
                rounded-md
                pl-10
                py-2
                outline-none
                focus:border-gray-500 focus:ring-gray-500 focus:ring-1
              "
              placeholder="搜尋"
              type="text"
              name="search"
            >
          </label>
        </div>
        <a class="hidden md:flex mx-2"> 我想開課 </a>
        <a v-show="isLogin" class="hidden md:flex mx-2 ml-3"> 我的學習 </a>
        <div
          class="relative flex mr-3 text-primary cursor-pointer"
          @click="toCart"
        >
          <span
            v-show="hasCarts"
            class="
              absolute
              inline-flex
              h-2
              w-2
              right-0
              rounded-full
              bg-error-900
            "
          />
          <span class="sr-only">cart</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <button
          v-show="!isLogin"
          type="button"
          class="
            hidden
            md:flex
            text-primary
            border border-primary
            bg-gray-50
            hover:bg-gray-200
            font-medium
            rounded-md
            text-sm
            px-5
            py-1.5
            ml-6
            mr-2
          "
          @click="$store.commit('SET_LOGIN_DIALOG', true)"
        >
          登入
        </button>
        <button
          v-show="!isLogin"
          type="button"
          class="
            hidden
            md:flex
            text-gray-50
            bg-primary
            font-medium
            rounded-md
            text-sm
            px-5
            py-1.5
            mx-1
          "
        >
          註冊
        </button>
        <div
          v-if="isLogin"
          class="hidden md:flex mx-2 cursor-pointer hover:opacity-75"
          @click="navbar = !navbar"
        >
          <img
            class="w-10 h-10 rounded-full"
            :src="storeProfile.avatar"
            alt="avatar"
          >
        </div>
        <button
          type="button"
          class="
            inline-flex
            items-center
            p-2
            text-sm text-gray-500
            rounded-lg
            md:hidden
            hover:bg-gray-100
          "
          @click="navbar = !navbar"
        >
          <svg
            v-show="!navbar"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            v-show="navbar"
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
    </header>
    <div
      v-show="navbar"
      class="
        absolute
        top-0
        right-0
        pt-14
        h-full
        w-screen
        md:w-1/3
        lg:w-1/3
        xl:w-1/6
        wd:mr-auto
        bg-gray-50
        shadow-lg
        z-20
      "
    >
      <div v-if="!isLogin" class="pt-4">
        <button
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-gray-500
            hover:bg-gray-100
            focus:bg-gray-200
          "
        >
          <div class="px-4">
            探索課程
          </div>
        </button>
        <button
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-gray-500
            hover:bg-gray-100
            focus:bg-gray-200
          "
        >
          <div class="px-4">
            企業方案
          </div>
        </button>
        <div class="mx-2 my-4 border border-b-gray-300" />
        <button
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-gray-500
            hover:bg-gray-100
            focus:bg-gray-200
          "
          @click="$store.commit('SET_LOGIN_DIALOG', true)"
        >
          <div class="px-4">
            登入
          </div>
        </button>
        <button
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-primary
            hover:bg-gray-100
            focus:bg-gray-200
          "
        >
          <div class="px-4">
            註冊
          </div>
        </button>
      </div>
      <div v-else>
        <div class="bg-secondary-100 py-4">
          <div class="flex justify-start items-center px-4">
            <div class="flex p-4 py-5">
              <img
                class="w-10 h-10 rounded-full"
                :src="storeProfile.avatar"
                alt="avatar"
              >
            </div>
            <div class="flex">
              {{ storeProfile.username }}
            </div>
          </div>
          <div class="mx-2 my-4 border border-b-gray-300" />
          <div
            v-for="(navList, idx) in navbarLists"
            :key="`navList-${idx}`"
            type="button"
            class="
              flex
              my-1
              p-4
              w-full
              font-medium
              text-md text-gray-500
              hover:bg-gray-300
              focus:bg-gray-200
            "
          >
            <div class="px-4">
              {{ navList.name }}
            </div>
          </div>
        </div>
        <div
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-gray-500
            hover:bg-gray-300
            focus:bg-gray-200
          "
        >
          <div class="px-4">
            探索課程
          </div>
        </div>
        <div class="mx-2 mb-4 border border-b-gray-300" />
        <button
          type="button"
          class="
            flex
            my-1
            p-4
            w-full
            font-medium
            text-md text-gray-500
            hover:bg-gray-300
            focus:bg-gray-200
          "
          @click="logout"
        >
          <div class="px-4">
            登出
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderNav',
  data () {
    return {
      navbar: false,
      navbarLists: [
        { name: '我的課程', to: '/' },
        { name: '我的抵用券', to: '/' },
        { name: '任務板', to: '/' },
        { name: '訂單記錄', to: '/' },
        { name: '帳戶設定', to: '/' },
        { name: '我開設的課', to: '/' }
      ],
      hasCarts: false
    }
  },
  computed: {
    ...mapGetters({
      storeProfile: 'me',
      isLogin: 'isLogin'
    })
  },
  mounted () {
    this.hasCarts = this.$cookies.get('cartsKeys') && this.$cookies.get('cartsKeys').length !== 0
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$toast.global.success('已成功登出')
      this.navbar = false
      this.$router.push('/')
    },
    toCart () {
      if (this.isLogin) {
        this.$router.push('/carts')
      } else {
        this.$store.commit('SET_LOGIN_DIALOG', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
