export default class Carts {
  constructor (axios, ctx) {
    this._axios = axios
    this._ctx = ctx
  }

  lists ({
    items,
    coupons
  }) {
    const form = {
      items,
      coupons
    }

    // 緩存按下加入購物車商品 id 機制
    const ids = items.map(item => item.id)
    const oldIds = this._ctx.$cookies.get('cartsKeys') || []
    const newIds = oldIds.concat(ids)
    this._ctx.$cookies.set('cartsKeys', Array.from(new Set(newIds)))
    return this._axios.$post('/carts', form)
  }

  create ({
    items,
    coupons
  }) {
    const form = {
      items,
      coupons
    }
    return this._axios.$post('/carts', form)
  }

  remove (id) {
    const data = {
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
    return this._axios.$delete('/carts', {
      data
    })
  }
}
