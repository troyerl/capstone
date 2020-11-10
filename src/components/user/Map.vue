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
        :position="getPosition(m.file)"
        :options="getContents(m.file)"
      />
    </GmapMap>
    
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Map',
  computed: {
    ...mapState([
      'coordinates',
      'images'
    ]),
  },
  mounted() {

    axios.get(`https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/user?userId=fc9ee2b7-aa3f-4148-9b88-477b27350ce5`)
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err);
      })
    
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
