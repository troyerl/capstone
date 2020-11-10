<template>
  <div>
    <GmapMap
      :center="{lat: coordinates.lat, lng: coordinates.lng}"
      :zoom="12"
      style="width: 100vw; height: 100vh"
    >
      <GmapInfoWindow
        v-for="(m) in images" @click="getImagesInFolder()"
        :key="m.path"
        :clickable="true"
        :position="getPosition(m)"
        :options="getContents(m.file)"      
      />
      <GmapMarker
        :key="index"
        :position="getPosition(m)"
        :clickable="true"
        @click="getImagesInFolder()"
        v-for="(m,index) in images" @click="getImagesInFolder()"
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
    // this.$getLocation()
    //     .then(coordinates => {
    //       this.$store.dispatch('setCoordinates', coordinates);
    //     });
    this.$store.dispatch('fetchUserInfo');
    
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
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    },
    getImagesInFolder() {
      console.log('test')
    }
  }
}
</script>

<style scoped>

</style>
