import Vue from 'vue'
import Toasted from 'vue-toasted'

export default function ({ app }, inject) {
  Vue.use(Toasted, {})

  Vue.toasted.register(
    'success',
    msg => msg,
    {
      position: 'top-center',
      type: 'success',
      duration: 2000
    }
  )

  Vue.toasted.register(
    'error',
    msg => msg,
    {
      position: 'top-center',
      type: 'error',
      action: [
        {
          text: 'X',
          onClick: (e, obj) => {
            obj.goAway(0)
          }
        }
      ]
    }
  )

  inject('toast', Vue.toasted)
}
