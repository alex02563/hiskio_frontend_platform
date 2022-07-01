import Vue from 'vue'

export default function (ctx, inject) {
  Vue.filter('tenPercent', (val) => {
    let num = Number(val)

    if (isNaN(num)) {
      num = ''
    }

    return num.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, digital) => {
      return pre + digital.replace(/\d{3}/g, ',$&')
    })
  })

  inject('filters', Vue.filter)
}
