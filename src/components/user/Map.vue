<template>
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
    <div v-if="folders.length > 0">
      <GmapInfoWindow
        v-for="(m) in folders"
        :key="m.path"
        :clickable="true"
        :position="getPosition(m)"
        :options="getContents(m.file)"      
      />
      <GmapMarker
        :key="index"
        :position="getPosition(m)"
        :clickable="true"
        @click="getImagesInFolder(m.folderId)"
        v-for="(m,index) in folders" 
      />
    </div>
    </GmapMap>
    
  </div>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Map',
  props: ['toggleShowImages'],
  computed: {
    ...mapState([
      'coordinates',
      'folders'
    ]),
  },
  mounted() {
    this.$getLocation()
        .then(coordinates => {
          this.$store.dispatch('setCoordinates', coordinates);
        });
  },
  methods: {
    getPosition(m) {
      return {
        lng: m.long,
        lat: m.lat,
      };
    },
    getContents(m) {
      return {
        content: `<img style="width: 50px; height: 50px;" src="${m}">`,
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    },
    getImagesInFolder(folderId) {
      this.$store.dispatch('getImageNames', { folderId });
      this.toggleShowImages();
    }
  }
}
</script>

<style scoped>

</style>
