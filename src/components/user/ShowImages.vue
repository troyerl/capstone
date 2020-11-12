<template>
  <div>
    <b-modal v-model="showImagesBool" centered hide-footer hide-header-close>
      <template #modal-header>
        
        <h5>{{imageRoutes.length}} images in folder</h5>
        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="closeModal()">
          <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </template>
      <div v-if="!showImages" class="d-flex justify-content-center flex-column align-items-center">
          <b-spinner class="my-3" label="Logging In..."></b-spinner>
          <p>Loading Images...</p>
      </div>
      <div class="d-flex flex-wrap justify-content-center text-center">
        <div :key="index" v-for="(image, index) in images">
          <img v-show="showImages" width="75" height="75" class="img mx-3 mt-2" :src="image" alt="image" @load="test()" @click="showSelectedImage(image)">
        </div>
        <b-button class="mt-3" block variant="primary" @click="loadMore()" v-if="(imageRoutes.length !== images.length) && showImages">Load More...</b-button>
      </div>
    </b-modal>


    <b-modal v-model="showSpecificImage" centered hide-footer hide-header>
      <img :src="imageUrl" style="max-width: 100%" alt="image">
    </b-modal>
  </div>
  
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
      'imageAmountInImagesArray'
    ]),
    showImages() {
      return this.loadImageNumber === this.imageAmountInImagesArray;
    }
  },
  data() {
    return {
      loadImageNumber: 0,
      showSpecificImage: false,
      imageUrl: ''
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('clearFolderSearch');
      this.toggleShowImages();
      this.loadImageNumber = 0;
    },
    loadMore() {
      this.$store.dispatch('loadMoreImages');
    },
    test(){
      this.loadImageNumber += 1;
    },
    showSelectedImage(image) {
      this.showSpecificImage = true;
      this.imageUrl = image;
    }
  }
}
</script>

<style>

</style>