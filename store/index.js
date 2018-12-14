import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTotal: 0,
      cart: {},
      sale: false,
      products: [],
      categories: []
    },
    getters: {
      getCart(state) {
        return state.cart;
      }
    },
    actions: {
      loadProducts ({ commit }) {
        axios.get("http://nit.tron.net.ua/api/product/list")
        .then(response => {
          commit('setProducts', response.data);
        })
      },
      loadCategories ({ commit }) {
        axios.get("http://nit.tron.net.ua/api/category/list")
        .then(response => {
          commit('setCategories', response.data);
        })
      },
      loadProductsWithCategory ({ commit }, id) {
        axios.get("http://nit.tron.net.ua/api/product/list/category/" + id)
        .then(response => {
          commit('setProducts', response.data);
        })
      },
    },
    mutations: {
      setProducts (state, products) {
        state.products = products
      },
      setCategories (state, categories) {
        state.categories = categories
      },
      switchSale: state => {
        state.sale = !state.sale;
      },
      clearCartCount: state => {
        state.cartTotal = 0;
      },
      clearCartContents: state => {
        state.cart = {};
      },
      addItem: (state, item) => {
        state.cartTotal++;
        if (item.name in state.cart) {
          state.cart[item.name].count++;
        } else {
          let stateItem = Object.assign({}, item);
          stateItem.count = 1;
          state.cart[item.name] = stateItem;
        }
      }
    }
  });
};

export default createStore;

//helper
const filter = (array, key, value) => array.filter(item => item[key] === value);
// const saleFilter = (array) => array.filter(item => item['special_price'] != null);
