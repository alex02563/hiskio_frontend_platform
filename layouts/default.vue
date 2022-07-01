<template>
  <div class="mx-auto w-screen h-screen">
    <div class="min-h-screen pt-14 bg-gray-100">
      <header-nav />
      <login-dialog />
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultIndex',
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  async mounted () {
    const accessToken = this.$cookies.get('user-accessToken')
    if (accessToken) {
      await this.$store.dispatch('profile')
    }
  }
}
</script>
