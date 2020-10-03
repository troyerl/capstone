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
    const self = this;
    self.map = new window.google.maps.Map(self.$refs["map"], {
      center: {lat: 39.7684, lng: -86.1581},
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
        self.map.setCenter(pos);
        self.$store.dispatch('setCoordinates', position.coords);
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
  width: 100vw;
  background: gray;
}
.gm-control-active .gm-fullscreen-control {
  display: none !important;
}
</style>
