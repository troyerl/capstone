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
        :options="getContents(m)"
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
      // map this.count to store.state.count
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
        lng: m.exifdata.GPSLongitude,
        lat: m.exifdata.GPSLatitude,
      };
    },
    getContents(m) {
      return {
        content: `<img style="height: 50px; width: 50px;" src='${URL.createObjectURL(m)}'>`,
      }
    }
  }
}
</script>

<style scoped>

</style>
