<template>
  <!-- <div id="map" ref="map"></div> -->
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
      <div :key="index" v-for="(m, index) in images">
        <GmapInfoWindow
          :position="getPosition(m)"
          :options="getContents(m)"
        />
      </div>
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
    const self = this;
    self.$getLocation()
      .then(coordinates => {
        this.$store.dispatch('setCoordinates', coordinates);
      });
  },
  methods: {
    getPosition(m) {
      let pos = {
        lng: 0,
        lat: 0
      }
      // if (m.exifdat) {

      // } else {
      //   pos = {
      //     lng: this.convertDMSToDD(m.exifdata.GPSLongitude),
      //     lat: this.convertDMSToDD(m.exifdata.GPSLatitude)
      //   }
      // }

      return pos;
    },
    convertDMSToDD(location) {
      let degrees = location[0]; 
      let minutes = location[1];
      let seconds  = location[2];

      let dd = degrees + (minutes/60) + (seconds/3600);
      
      return dd;
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
