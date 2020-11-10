<template>
  <!-- <div id="map" ref="map"></div> -->
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
      <GmapInfoWindow
        :key="index"
        v-for="(m, index) in images"
        :position="getPosition(m)"
        :options="getContents(m.file)"
      />
    </GmapMap>
    
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';

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
    }
  }
}
</script>

<style scoped>

</style>
