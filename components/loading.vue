<template>
  <div
    v-show="loading"
    class="
      fixed
      loading-bg
      bg-white
      w-screen
      h-screen
      opacity-75
      flex
      item-center
      justify-center
      loading-bg
    "
    :class="{
      'z-50': loading,
      'page-leave-active z-0': !loading
    }"
  >
    <div class="flex text-xl font-bold my-auto">
      載入中...
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
  data () {
    return {
      loading: true,
      percent: 0
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    },
    set (num) {
      this.loading = true
      this.percent = Math.min(100, Math.max(0, Math.floor(num)))
    }
  }
}
</script>

<style lang="scss">
.loading-bg {
  transition: all 0.25s ease-in;
  &.page-leave-active {
    opacity: 0;
    transition: all 0.25s ease-out;
  }
}
</style>
