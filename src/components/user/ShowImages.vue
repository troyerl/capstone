<template>
  <b-modal v-model="showImagesBool" centered hide-footer hide-header-close>
    <template #modal-header>
      
      <h5>{{imageRoutes.length}} images in folder</h5>
      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="closeModal()">
        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </template>
    <div v-show="showFetchImagesLoader">
        <b-spinner class="my-3" label="Logging In..."></b-spinner>
    </div>
    <div v-show="!showFetchImagesLoader" class="d-flex flex-wrap justify-content-center text-center">
      <div :key="index" v-for="(image, index) in images">
        <img width="75" height="75" class="img mx-3 mt-2" :src="image.src" alt="" v-if="image.complete">
        <b-skeleton-img no-aspect height="75px" v-else></b-skeleton-img>
      </div>
      <b-button class="mt-3" block variant="primary">Load More...</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ShowImages',
  props: ['showImagesBool', 'toggleShowImages'],
  computed: {
    ...mapState([
      'imageRoutes',
      'images',
      'showFetchImagesLoader'
    ])
  },
  data() {
    return {
      imagesCheck: 0
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('clearFolderSearch');
      this.toggleShowImages();
    },
  }
}
</script>

<style>

</style>