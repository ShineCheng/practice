import shop from '../../api/shop'

const state = {
  products: shop.getProducts(),
}

const getters = {
}

const actions = {
}

const mutations = {
    addToCart(state, payload) {
      const currentItem = this.state.cart.productsInCart.find(item => item.pId === payload.item.pId);
      if ( currentItem ) {
        // 如果 product 已經在 state.productsInCart 內，數量+1
        currentItem.amount++;
      } else {
        // 如果 product 沒有在 state.productsInCart 內，新增一筆
        this.state.cart.productsInCart.push({pId: payload.item.pId, amount: 1});
      }

      payload.item.inStock--;
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}