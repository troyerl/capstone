import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    userInfo: null,
    coordinates: {
      lng: -86.1581,
      lat: 39.7684
    },
    folders: [],
    images: [],
    imageRoutes: [],
    currentImageIndex: 0,
    loadedImageNumber: 0,
    imageAmountInImagesArray: 0
  },
  mutations: {
    updateCoordinates(state, payload) {
      state.coordinates = payload;
    },
    clearFolders(state) {
      state.folders = [];
    },
    updateImages(state, payload) {
      const fileInfo = payload.filePath.split("/");
      const imageInfo = state.folders.find(imageInfo => imageInfo.folderId === fileInfo[1]);

      if (imageInfo) {
        imageInfo.file = payload.file;
        imageInfo.imageName = fileInfo[2];
      } else {
        state.folders.push({ file: payload.file, folderId: fileInfo[1], imageName: fileInfo[2] });
      }
    },
    setUser(state, payload) {
      state.userInfo = payload;
    },
    clearState(state) {
      state.userInfo = null;
      state.coordinates = {
        lng: -86.1581,
        lat: 39.7684
      };
      state.folders = [];
      state.images = [];
      state.imageRoutes = [];
      state.currentImageIndex = 0;
      state.loadedImageNumber = 0;
      state.imageAmountInImagesArray = 0;
    },
    addNewImage(state, payload) {
      const { folderId, imageName, file } = payload;
      const imageInfo = state.folders.find(imageInfo => imageInfo.folderId === folderId);

      if (imageInfo) {
        imageInfo.imageName = imageName;
        imageInfo.file = file;
      } else {
        state.folders.push({ ...payload });
      }
    },
    setFolderImages(state, payload) {
      state.imageRoutes = payload.imageRoutes;
    },
    addImageToImages(state, image) {
      state.images.push(image);
    },
    clearFoldersAndImages(state) {
      state.images = [];
      state.imageRoutes = [];
      state.currentImageIndex = 0;
      state.imageAmountInImagesArray = 0;
    },
    updateIndex(state, indexAmount) {
      state.currentImageIndex += indexAmount;
    },
    increaseLoadImage(state) {
      state.loadedImageNumber++;
    },
    increaseImageAmountInImagesArray(state) {
      state.imageAmountInImagesArray++;
    }
  },
  actions: {
    setCoordinates({ commit }, payload) {
      commit('updateCoordinates', payload);
    },
    addToImages({ commit }, payload) {
      commit('addNewImage', payload);
    },
    setNewUser({ commit }, payload) {
      commit('setUser', payload);
    },
    getLoggedInUser({ commit }, payload) {
      commit('setUser', payload);
    },
    logoutUser({ commit }) {
      commit('clearState');
    },
    fetchUserInfo({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('clearFolders');
        fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/user?userId=${state.userInfo.id}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
        })
          .then(async response => {
            const data = await response.json();
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

      fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?imageName=${topImage}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      })
        .then(async (response) => {
          const image = await response.json();
          const pathSplit = topImage.split("/");
          commit('addNewImage', { lat: lat * (180 / Math.PI), long: long * (180 / Math.PI), folderId: pathSplit[1], imageName: pathSplit[2], file: image.imageUrl });
        });
    },
    uploadImage({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { lat, long, file } = payload;
        const baseURL = `https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?userId=${state.userInfo.id}&LAT=${lat}&LONG=${long}`;
        fetch(baseURL, {
          body: file,
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          header: {
            'Content-Type': file.type
          }
        }).then(async (response) => {
          let data = await response.json();
          const pathSplit = data.path.split("/");
          commit('addNewImage', { lat, long, folderId: pathSplit[1], imageName: pathSplit[2], file: data.imageUrl });
          resolve();
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      })
    },
    getImagesFromFolder({ commit }, imageRoute) {
      fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?imageName=${imageRoute}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      })
        .then(async (response) => {
          const image = await response.json();
          commit('addImageToImages', image.imageUrl);
        });
    },
    getImageNames({ commit, state, dispatch }, payload) {

      fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/location?userId=${state.userInfo.id}&path=${payload.folderId}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      })
        .then(async response => {
          const data = await response.json();
          commit('setFolderImages', { imageRoutes: data });

          const firstNineImages = 9;
          for (let i = 0; i < firstNineImages; i++) {
            if (data[i]) {
              commit('increaseImageAmountInImagesArray');
              dispatch('getImagesFromFolder', data[i]);
            }
          }
          commit('updateIndex', 9);

        })
        .catch(error => {
          console.error("There was an error!", error);
        })
    },
    loadMoreImages({ commit, dispatch, state }) {
      let currentIndex = state.currentImageIndex;
      for (let i = currentIndex; i < currentIndex + 9; i++) {
        if (state.imageRoutes[i]) {
          commit('increaseImageAmountInImagesArray');
          dispatch('getImagesFromFolder', state.imageRoutes[i]);
        }
      }

      commit('updateIndex', 9);
    },
    clearFolderSearch({ commit }) {
      commit('clearFoldersAndImages');
    },
    increaseLoadedImageNumber({ commit }) {
      commit('increaseLoadImage');
    }
  }
})
