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
    folders: [],
    images: [],
    imageNames: []
  },
  mutations: {
    updateCoordinates(state, payload) {
      state.coordinates = payload;
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
    addNewImage(state, payload) {
      const { folderId, imageName, file } = payload;
      const imageInfo = state.folders.find(imageInfo => imageInfo.folderId === folderId);

      if (imageInfo) {
        imageInfo.imageName = imageName;
        imageInfo.file = file;
      } else {
        state.folders.push({ ...payload });
      }
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

      fetch(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?imageName=${topImage}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
      })
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((text) => {
        const pathSplit = topImage.split("/");
        var image = new Image(50, 50);
        image.src = `data:image/${pathSplit[2].split(".")[1]};base64,${text}`;
        commit('addNewImage', { lat: lat * (180/Math.PI), long: long * (180/Math.PI), folderId: pathSplit[1], imageName: pathSplit[2], file: image });
      });
    },
    uploadImage({ commit, state }, payload) {
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
        const pathSplit = data.split("/");

        let reader = new FileReader();
        reader.onloadend = function() {
          const image = new Image(50, 50);
          image.src = reader.result;

          commit('addNewImage', {lat, long, folderId: pathSplit[1], imageName: pathSplit[2], file: image });
        }
        reader.readAsDataURL(file);
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
