
const state = {
  productsInCart: [],
  checkoutStatus: null
}

const getters = {
  total: (state, getters, rootState) => {
    return state.productsInCart.reduce((total, item) => {
      return total + rootState.products.products.find(item2 => item2.pId === item.pId).price * item.amount
    }, 0)
  }
}

const actions = {
  checkout({ commit, state, rootState }) {
    setTimeout(() => {
      console.log("==============================\n");
      console.log("user checkout\n");
      state.productsInCart.map(item => {
        console.log(`name: ${rootState.products.products.find(item2 => item2.pId === item.pId).name}; price: ${rootState.products.products.find(item2 => item2.pId === item.pId).price}; amount: ${item.amount}\n`);
      });
      console.log(`total: ${this.getters.total}`);
      console.log("==============================\n");

      state.productsInCart = [];
      state.checkoutStatus = "successful";
    }, 1000);
  }
}

const mutations = {
  removeFromCart(state, payload) {
    const currentItem = this.state.products.products.find(item => item.pId === payload.item.pId);
    currentItem.inStock++;

    payload.item.amount--;

    state.productsInCart = state.productsInCart.filter(item => item.amount > 0);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}