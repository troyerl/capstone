<template>
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
      <GmapInfoWindow
        :key="index"
        :clickable="true"
        v-for="(m, index) in images"
        :position="getPosition(m)"
        :options="getContents(m.file)"
        @click="getImagesInFolder(m)"
      />
    </GmapMap>
    
  </div>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Map',
  computed: {
    ...mapState([
      'coordinates',
      'images'
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
        content: m,
      }
    },
    getImagesInFolder(m) {
      console.log(m)
    }
  }
}
</script>

<style scoped>

</style>
