import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favouriteList: null,
    coinList: null
  },
  getters: {
    favouriteList: s => s.favouriteList,
    coinList: s => s.coinList,
  },
  mutations: {
    UPDATE_FAVORITES(state, payload) {
      state.favouriteList = payload
    },
    UPDATE_COINLIST(state, coinList) {
      state.coinList = coinList
    }
  },
  actions: {
    addToCoinList(context, payload) {
      context.commit('UPDATE_COINLIST', payload)
    },
    addToFavouriteList(context, payload) {
      var newList = [];
      payload.forEach(function (item) {
        if (item.favourite == true) {
          newList.push(item);
        }
      });
      context.commit('UPDATE_COINLIST', payload)
      context.commit('UPDATE_FAVORITES', newList)
    }
  },
  modules: {
  }
})
