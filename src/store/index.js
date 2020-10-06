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
    images: []
  },
  mutations: {
    updateCoordinates(state, payload) {
      state.coordinates = payload;
    },
    updateImages(state, payload) {
      state.images.push(payload);
    },
    setUser(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    setCoordinates(context, payload) {
      context.commit('updateCoordinates', payload);
    },
    addToImages(context, payload) {
      context.commit('updateImages', payload);
    },
    setNewUser(context, payload) {
      context.commit('setUser', payload);
    },
    getLoggedInUser(context, payload) {
      context.commit('setUser', payload);
    }
  },
  getters: {
    getCoordinates: state => {
      return state.coordinates;
    }
  }
})
