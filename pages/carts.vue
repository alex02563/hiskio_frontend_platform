<template>
  <div class="w-full">
    <div class="flex justify-center bg-gray-50 py-6 md:py-20">
      <div class="xl:w-1/2 px-2">
        <div class="grid col-span-12 md:grid-cols-3 gap-4">
          <div class="md:col-span-2 mb-5">
            <div class="font-bold text-xl mb-5">
              購物車
            </div>
            <table
              class="
                w-full
                table-fixed
                text-sm text-left
                shadow-lg
                text-gray-400
                hidden
                md:table
              "
            >
              <thead class="bg-white text-medium text-gray-400">
                <tr>
                  <th width="50%" scope="col" class="px-3 py-3">
                    項目
                  </th>
                  <th width="25%" scope="col" class="px-6 py-3 text-center">
                    售價
                  </th>
                  <th width="25%" scope="col" class="px-6 py-3 text-center">
                    結帳金額
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(list, idx) in carts.data"
                  :key="`list-${idx}`"
                  class="bg-white border-t border-gray-300"
                >
                  <th scope="row" class="py-5 pl-3 flex">
                    <img
                      :src="list.image"
                      class="
                        h-full
                        w-32
                        bg-contain bg-center bg-no-repeat
                        rounded-lg
                        bg-gray-100
                      "
                      :alt="list.name"
                    >
                    <div class="p-3 self-start font-medium text-gray-700">
                      {{ list.name }}
                    </div>
                  </th>
                  <td class="px-6 py-4 text-lg text-center">
                    <div
                      v-show="list.globalCouponCode"
                      class="line-through text-sm text-gray-400"
                    >
                      {{ list.subtotal | tenPercent }}
                    </div>
                    <div
                      class="text-lg"
                      :class="{
                        'text-warn': list.globalCouponCode,
                        'text-gray-500': !list.globalCouponCode,
                      }"
                    >
                      {{ list.total | tenPercent }}
                    </div>
                    <div
                      v-show="list.globalCouponCode"
                      class="border border-warn p-1 text-warn text-xs"
                    >
                      折扣優惠
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex justify-around">
                      <div class="text-xl font-bold text-gray-600 text-center">
                        {{ list.total | tenPercent }}
                      </div>
                      <a
                        class="
                          font-medium
                          text-gray-300
                          hover:text-gray-600
                          cursor-pointer
                        "
                        @click="removeCart(list.id)"
                      >
                        <svg
                          class="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path
                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                          />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr v-show="!carts.data">
                  <td colspan="3" class="p-3 text-xl text-center font-medium">
                    尚無資料
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="shadow-lg md:hidden">
              <tbody>
                <tr
                  v-for="(list, idx) in carts.data"
                  :key="`list-mb-${idx}`"
                  class="bg-white border-t border-gray-300"
                >
                  <th class="p-2 flex items-center justify-between">
                    <div
                      class="
                        flex
                        items-center
                        text-sm text-left
                        font-medium
                        text-gray-700
                      "
                    >
                      <img
                        :src="list.image"
                        class="
                          h-full
                          w-16
                          bg-contain bg-center bg-no-repeat
                          rounded-lg
                          bg-gray-100
                          mr-3
                        "
                        :alt="list.name"
                      >
                      {{ list.name }}
                    </div>
                    <div
                      class="
                        font-medium
                        text-gray-300
                        hover:text-gray-600
                        cursor-pointer
                      "
                      @click="removeCart(list.id)"
                    >
                      <svg
                        class="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </div>
                  </th>
                  <td class="p-2 text-lg text-center flex justify-between">
                    <div class="flex items-center">
                      <div class="line-through text-sm text-gray-400">
                        {{ list.subtotal | tenPercent }}
                      </div>
                    </div>
                    <div
                      class="text-lg"
                      :class="{
                        'text-warn': list.globalCouponCode,
                        'text-gray-500': !list.globalCouponCode,
                      }"
                    >
                      {{ list.total | tenPercent }}
                    </div>
                  </td>
                </tr>
                <tr v-show="!carts.data">
                  <td colspan="3" class="p-3 text-xl text-center font-medium">
                    尚無資料
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div class="font-bold text-xl mb-5">
              小計
            </div>
            <div
              class="bg-white text-gray-400 rounded-lg shadow-lg p-4 grid gap-2"
            >
              <div class="col-span-12">
                輸入折扣代碼
              </div>
              <input
                class="
                  col-span-12
                  md:col-span-10
                  w-full
                  h-8
                  rounded-sm
                  border border-gray-300
                "
                type="text"
              >
              <div class="md:col-span-2 hidden md:flex">
                <button
                  type="button"
                  class="
                    text-error-900
                    bg-error-100
                    xl:font-medium
                    lg:font-sm
                    rounded-sm
                    text-center
                    font-bold
                    w-full
                    h-8
                    p-1
                  "
                >
                  確定
                </button>
              </div>
              <div class="col-span-12 text-gray-600 text-lg font-bold mt-2">
                <span class="underline underline-offset-1">選擇抵用券</span> →
              </div>
              <div
                v-for="(coupon, couponsIdx) in carts.globalCoupons"
                :key="`couponsIdx-${couponsIdx}`"
                class="col-span-12 bg-secondary-200 text-primary p-2 text-xs"
              >
                <p class="text-clip overflow-hidden">
                  {{ coupon.title }}
                </p>
              </div>
              <div class="col-span-12 mt-2 border border-b-gray-300" />
              <div class="col-span-6 mt-2 text-medium">
                金額
              </div>
              <div class="col-span-6 text-right mt-2 text-gray-600 text-medium">
                {{ carts.subtotal | tenPercent }}
              </div>
              <div class="col-span-6 text-medium text-warn">
                折抵
              </div>
              <div class="col-span-6 text-right text-warn text-medium">
                - {{ discount | tenPercent }}
              </div>
              <div
                class="col-span-12 text-gray-700 text-right text-2xl font-bold"
              >
                {{ carts.total | tenPercent }}
              </div>
              <div class="col-span-12">
                <button
                  type="button"
                  class="
                    text-white
                    bg-error-900
                    xl:font-medium
                    lg:font-sm
                    rounded-sm
                    text-center
                    w-full
                    h-9
                    p-1
                  "
                >
                  前往結帳
                </button>
              </div>
              <div class="col-span-12 text-gray-400 text-xs mt-2">
                點擊上方按鈕即表示您已閱讀並同意
                <span class="underline underline-offset-1">「HiSKIO購買與退費政策」</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex xl:justify-center bg-gray-100 py-6 md:py-10">
      <productCard
        :lists="course"
      >
        <template #title>
          募資課程
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartsIndex',
  data () {
    return {
      carts: [],
      course: []
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    }),
    discount ({ carts }) {
      return Number.parseFloat(carts.subtotal - carts.total)
    }
  },
  mounted () {
    if (!this.isLogin) {
      this.$router.push('/')
    }
    this.getCourse()
    this.initCart()
  },
  methods: {
    async getCourse () {
      const courseData = await this.$api.course.fundraising()
      if (!courseData.errorCode) {
        this.course = courseData
      }
    },
    async initCart () {
      const ids = this.$cookies.get('cartsKeys') || []
      const items = ids.map(id => ({
        coupon: '',
        gid: '',
        id,
        pipeline: '',
        source: ''
      }))

      const form = {
        items,
        coupons: []
      }

      const cartsData = await this.$api.carts.lists(form)
      if (!cartsData.errorCode) {
        const items = cartsData.data.map(item => ({
          coupon: '',
          gid: '',
          id: item.id,
          pipeline: '',
          source: ''
        }))
        const coupons = cartsData.globalCoupons.map(item => item.code)

        const form = {
          items,
          coupons
        }

        const couponsCartsData = await this.$api.carts.lists(form)
        if (!couponsCartsData.errorCode) {
          this.carts = couponsCartsData
        }
      }
    },
    async addCart (id) {
      const removeData = await this.$api.carts.create(id)
      if (!removeData.errorCode) {
        this.$toast.global.success('已加入購物車')
        this.initCart()
      }
    },
    async removeCart (id) {
      const form = {
        items: [
          {
            id,
            coupon: ''
          }
        ],
        coupons: []
      }
      const removeData = await this.$api.carts.remove(form)
      if (!removeData.errorCode) {
        this.$toast.global.error('已刪除成功')
        this.initCart()
      }
    }
  }
}
</script>
