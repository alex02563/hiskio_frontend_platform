<template>
  <div class="mx-auto container w-screen h-screen text-center">
    <div class="h-full flex justify-center items-center">
      <div>
        <div class="flex justify-center">
          <img
            :src="require('~/assets/img/logo-hiskio.svg')"
            class="h-full w-24 bg-contain bg-center bg-no-repeat"
            alt="logo-hisk"
          >
        </div>
        <div class="text-8xl">
          {{ error.statusCode }}
        </div>
        <div class="text-xl my-8">
          Message: {{ error.message }}
        </div>
        <nuxt-link to="/" class="text-sm px-6 py-3 bg-primary text-white rounded-md hover:opacity-75">
          回首頁
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorIndex',
  layout: 'white',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.push({
        path: '/',
        query: {
          reset: this.reset
        }
      })
    }
  }
}
</script>
