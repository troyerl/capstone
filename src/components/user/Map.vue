<template>
  <!-- <div id="map" ref="map"></div> -->
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
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
    ]),
  },
  mounted() {
    const self = this;
    self.$getLocation()
      .then(coordinates => {
        this.$store.dispatch('setCoordinates', coordinates);
      });
  },
}
</script>

<style scoped>

</style>
