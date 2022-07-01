<template>
  <div class="w-full mx-auto container py-6">
    <productCard :lists="course">
      <template #title>
        正在募資中的課程
      </template>
      <template slot-scope="item">
        <div
          class="
            absolute
            bottom-2
            right-4
            p-1
            text-gray-700
            bg-white
            rounded-full
            shadow-lg
            cursor-pointer
            hover:text-gray-900
          "
        >
          <span class="sr-only">cart</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="addCart(item.data.id)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div
          class="
            absolute
            bottom-2
            right-14
            p-1
            text-gray-700
            bg-white
            rounded-full
            shadow-lg
          "
        >
          <span class="sr-only">tag</span>
          <svg
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
      </template>
    </productCard>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      course: [],
      popularity: []
    }
  },
  mounted () {
    this.getCourse()
  },
  methods: {
    async getCourse () {
      const courseData = await this.$api.course.fundraising()
      if (!courseData.errorCode) {
        this.course = courseData
      }
    },
    async addCart (id) {
      const form = {
        items: [
          {
            coupon: '',
            gid: '',
            id,
            pipeline: '',
            source: ''
          }
        ],
        coupons: []
      }
      const removeData = await this.$api.carts.create(form)
      if (!removeData.errorCode) {
        this.$toast.global.success('已加入購物車')
      }
    }
  }
}
</script>
