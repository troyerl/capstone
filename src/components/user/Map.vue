<template>
  <div id="map" ref="map"></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Map',
  data() {
    return {
      map: null
    }
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      'coordinates',
    ]),
  },
  mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      center: {lat: this.coordinates.latitude, lng: this.coordinates.longitude},
      zoom: 12
    })  

    // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map.setCenter(pos);
        this.$store.dispatch('setCoordinates', position.coords);
      },
      () => {
        console.log('err');
      }
    );
  } else {
    // Browser doesn't support Geolocation
    console.log('err');
  } 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 100vh;
  background: gray;
}
.gm-control-active .gm-fullscreen-control {
  display: none !important;
}
</style>
