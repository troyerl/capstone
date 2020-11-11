<template>
  <div class="main">
    <button class="logout-button" @click="logout()">
      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
      </svg>
    </button>
    <Map :toggleShowImages="toggleShowImages"/>
    <UploadFile/>
    <ShowImages :showImagesBool="showImagesBool" :toggleShowImages="toggleShowImages"/>
  </div>
</template>

<script>
import Map from './Map';
import UploadFile from './UploadFile';
import ShowImages from './ShowImages';
import routes from '../../router/routes';

import { mapState } from 'vuex';

export default {
  name: 'Main',
  computed: {
    ...mapState([
      'folders'
    ])
  },
  mounted() {
    if (this.folders.length === 0) {
      this.$store.dispatch('fetchUserInfo');
    }
  },
  components: {
    Map,
    UploadFile,
    ShowImages
  },
  data() {
    return {
      showImagesBool: false
    }
  },
  methods: {
    toggleShowImages() {
      this.showImagesBool = !this.showImagesBool;
    },
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.push(routes.login);
    }
  }
}
</script>

<style>
.logout-button {
  background-color: #D8554D; /* Green */
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  position: fixed;
  z-index: 3;
  right: 0.5em;
  top: 0.5em;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}
</style>