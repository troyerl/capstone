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
      const fileInfo = payload.filePath.split("/");
      const imageInfo = state.images.find(imageInfo => imageInfo.folderId === fileInfo[1]);

      if (imageInfo) {
        imageInfo.file = payload.file;
        imageInfo.imageName = fileInfo[2];
      } else {
        state.images.push({ file: payload.file, folderId: fileInfo[1], imageName: fileInfo[2] });
      }
    },
    setUser(state, payload) {
      state.userInfo = payload;
    },
    addNewImage(state, payload) {
      state.images.push({ ...payload });
    }
  },
  actions: {
    setCoordinates({ commit }, payload) {
      commit('updateCoordinates', payload);
    },
    addToImages({ commit }, payload) {
      const file = payload.file;
      commit('updateImages', payload);
      commit('updateCoordinates', { lng: file.exifdata["GPSLongitude"], lat: file.exifdata["GPSLatitude"] });
    },
    setNewUser({ commit }, payload) {
      commit('setUser', payload);
    },
    getLoggedInUser({ commit }, payload) {
      commit('setUser', payload);
    },
    fetchUserInfo({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/user?userId=${state.userInfo.id}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
        })
        .then(async response => {
          const data = await response.json();
          // console.log(data.locations);
          data.locations.forEach(image => {
            dispatch('fetchImage', image);
          });
          
          resolve();
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
          reject();
        });
      })
    },
    fetchImage({ commit }, payload) {
      const { lat, long, topImage } = payload;

      fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?imageName=${topImage}`)
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((text) => {
        var image = new Image(50, 50);
        image.src = `data:image/png;base64,${text}`;
        const pathSplit = topImage.split("/");
        commit('addNewImage', { lat: lat * (180/Math.PI), long: long * (180/Math.PI), folderId: pathSplit[1], imageName: pathSplit[2], file: image });
      });
    }
  }
})
