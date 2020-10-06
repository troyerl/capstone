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
    this.$getLocation()
      .then(coordinates => {
        this.$store.dispatch('setCoordinates', coordinates);
      });
  },
  methods: {
    getPosition(m) {
      let lngCoords = { location: m.exifdata.GPSLongitude, direction: null };
      let latCoords = { location: m.exifdata.GPSLatitude, direction: null };

      if (('GPSLatitudeRef' in m.exifdata) && ('GPSLongitudeRef' in m.exifdata)) {
        latCoords.direction = m.exifdata.GPSLatitudeRef;
        lngCoords.direction = m.exifdata.GPSLongitudeRef;
      }

      return {
        lng: this.convertDMSToDD(lngCoords),
        lat: this.convertDMSToDD(latCoords),
      };
    },
    convertDMSToDD({ location: [degrees, minutes, seconds], direction }) {

      let dd = degrees + (minutes/60) + (seconds/3600);

      if (direction && (direction === "S" || direction === "W")) {
        dd = -Math.abs(dd); 
      }
      
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
