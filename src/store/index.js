import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    coordinates: {
      lng: -86.1581,
      lat: 39.7684
    },
  },
  mutations: {
    updateCoordinates(state, payload) {
      state.coordinates = payload;
    }
  },
  actions: {
    setCoordinates(context, payload) {
      context.commit('updateCoordinates', payload);
    }
  },
  getters: {
    getCoordinates: state => {
      return state.coordinates;
    }
  }
})
