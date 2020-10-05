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
      if (m.exifdata.hasOwnProperty('GPSLatitudeRef') && m.exifdata.hasOwnProperty('GPSLongitudeRef')) {
        pos = {
          lng: this.convertDMSToDD({ location: m.exifdata.GPSLongitude, direction: m.exifdata.GPSLongitudeRef }),
          lat: this.convertDMSToDD({ location: m.exifdata.GPSLatitude, direction: m.exifdata.GPSLatitudeRef })
        }
      } else {
        pos = {
          lng: this.convertDMSToDD({ location: m.exifdata.GPSLongitude, direction: null }),
          lat: this.convertDMSToDD({ location: m.exifdata.GPSLatitude, direction: null })
        }
      }

      return pos;
    },
    convertDMSToDD({ location, direction }) {
      let degrees = location[0]; 
      let minutes = location[1];
      let seconds  = location[2];

      let dd = degrees + (minutes/60) + (seconds/3600);

      if (direction) {
        if (direction === "S" || direction === "W") {
          dd = -Math.abs(dd); 
        }
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
