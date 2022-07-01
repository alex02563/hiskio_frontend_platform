<template>
  <div class="xl:w-1/2 px-2">
    <div class="grid col-span-12 md:grid-cols-3 gap-4">
      <div class="md:col-span-12">
        <div class="font-bold text-xl">
          <slot name="title" />
        </div>
      </div>
      <div
        v-for="(courseList, courseIdx) in lists"
        :key="`courseList-${courseIdx}`"
        class="bg-white rounded-lg shadow-lg hidden md:table"
      >
        <div class="relative mb-4">
          <img
            :src="courseList.image"
            class="
              h-full
              w-auto
              bg-contain bg-center bg-no-repeat
              rounded-t-lg
              bg-gray-100
            "
            :alt="courseList.name"
          >
          <slot :data="courseList" />
        </div>
        <div class="p-3">
          <div class="w-auto text-xl font-bold line-clamp-2">
            {{ courseList.title }}
          </div>
          <div v-if="courseList.lecturers" class="flex items-center my-3">
            <img
              class="w-8 h-8 rounded-full"
              :src="courseList.lecturers[0].avatar"
              :alt="courseList"
            >
            <div class="ml-3 text-gray-500">
              {{ courseList.lecturers[0].username }}
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>剩 3 天</div>
            <div class="font-bold">
              已募資
              {{
                percentage(courseList.consumers, courseList.fundraisingTickets)
              }}
              %
            </div>
          </div>
          <div class="w-full bg-gray-300 rounded-full h-2 my-2">
            <div
              class="bg-error-900 h-2 rounded-full"
              :style="`width: ${
                percentage(
                  courseList.consumers,
                  courseList.fundraisingTickets
                ) >= 100
                  ? 100
                  : percentage(
                    courseList.consumers,
                    courseList.fundraisingTickets
                  )
              }%;`"
            />
          </div>
          <div class="flex items-center">
            <div class="mr-1 text-lg text-gray-700 font-bold">
              ${{ courseList.price | tenPercent }}
            </div>
            <div class="text-sm text-gray-400 line-through">
              ${{ courseList.fixedPrice | tenPercent }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="(courseList, courseIdx) in lists"
        :key="`courseList-mb-${courseIdx}`"
        class="bg-white rounded-lg shadow-lg md:hidden"
      >
        <div class="flex justify-space items-start p-2">
          <img
            :src="courseList.image"
            class="
              h-full
              w-48
              bg-contain bg-center bg-no-repeat
              rounded-lg
              shadow-lg
              bg-gray-100
              m-3
            "
            :alt="courseList.name"
          >
          <div class="flex-auto p-2 pr-0">
            <div class="flex items-center">
              <div class="font-bold">
                已募資
                {{
                  percentage(
                    courseList.consumers,
                    courseList.fundraisingTickets
                  )
                }}
                %
              </div>
            </div>
            <div class="w-full bg-gray-300 rounded-full h-2 my-2">
              <div
                class="bg-error-900 h-2 rounded-full"
                :style="`width: ${
                  percentage(
                    courseList.consumers,
                    courseList.fundraisingTickets
                  ) >= 100
                    ? 100
                    : percentage(
                      courseList.consumers,
                      courseList.fundraisingTickets
                    )
                }%;`"
              />
            </div>
            <div class="flex items-center">
              <div class="mr-1 text-lg text-gray-700 font-bold">
                ${{ courseList.price | tenPercent }}
              </div>
              <div class="text-sm text-gray-400 line-through">
                ${{ courseList.fixedPrice | tenPercent }}
              </div>
            </div>
          </div>
          <div v-if="courseList.lecturers" class="flex items-center m-4">
            <img
              class="w-8 h-8 rounded-full"
              :src="courseList.lecturers[0].avatar"
              :alt="courseList"
            >
          </div>
        </div>
        <div class="p-3 pt-0">
          <div class="w-auto text-sm font-bold line-clamp-2">
            {{ courseList.title }}
          </div>
        </div>
      </div>

      <div v-show="!lists">
        <div class="bg-white text-center p-5 rounded-lg shadow-lg">
          尚無資料
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    percentage (consumers, fundraisingTickets) {
      return Number.parseFloat(
        ((consumers || 0) / (fundraisingTickets || 0)) * 100
      ).toFixed()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
