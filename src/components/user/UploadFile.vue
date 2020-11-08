<template>
  <div class="upload-file">
    <button class="add-image-button" @click="$bvModal.show('upload-photos-modal')">
      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </button>
    <b-modal id="upload-photos-modal" hide-footer hide-header centered>
      <div class="text-center">
        <h4>{{uploadingFiles ? 'Uploading File(s)' : 'Upload Photos!'}}</h4>
        <div v-if="uploadingFiles">
          <b-spinner class="my-3" label="Loading..."></b-spinner>
        </div>
        <div v-else class="d-flex flex-column justify-content-center align-items-center">
          <b-form-file v-model="file" class="mt-3"></b-form-file>
          <pre>{{JSON.stringify(test, null, '\t')}}</pre>
          <div>
            <b-button class="mt-3 mr-3" @click="uploadImage">Upload</b-button>
            <b-button class="mt-3" @click="$bvModal.hide('upload-photos-modal')">Cancel</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import EXIF from 'exif-js';
// import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'UploadFile',
  data() {
    return {
      file: null,
      uploadingFiles: false,
      test: null
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    uploadImage() {
      const self = this;
      if (self.file) {
        // self.uploadingFiles = true;
        EXIF.getData(self.file, async function() {
          if (self.isEmpty(self.file.exifdata)) {
            let coordinates = await self.$getLocation();
            self.file.exifdata["GPSLatitude"] = coordinates.lat;
            self.file.exifdata["GPSLongitude"] = coordinates.lng;
          } else {
            self.file.exifdata["GPSLatitude"] = self.convertDMSToDD(self.file.exifdata["GPSLatitude"]);
            self.file.exifdata["GPSLongitude"] = self.convertDMSToDD(self.file.exifdata["GPSLongitude"]);
          }

          self.test = self.file;
          self.$store.dispatch('addToImages', self.file);
          // self.$bvModal.hide('upload-photos-modal');


           
          //https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?userId="b4db5ad2-549c-4e14-8a02-20b06b0cff03"&LAT=39.7934592&Long=-86.1732864
          // const baseURL = `https://gckm6smf0j.execute-api.us-east-1.amazonaws.com/image?userId=${userId.id}&LAT=${}`;
          // axios.post(baseURL, self.file, {
          //   header: {
          //     'Content-Type': self.file.type
          //   }
          // }).then(() => {
          //     self.$bvModal.hide('upload-photos-modal');
          //     self.$store.dispatch('addToImages', self.file);
          //     self.uploadingFiles = false;
          //   }).catch(err => {
          //     console.log("ERROR: " + err);
          //     self.uploadingFiles = false;
          //   })
        })
      }
    },
    isEmpty(obj) {
      return JSON.stringify(obj) === '{}';
    },
    convertDMSToDD([deg, min, sec]) {
      return deg + (min/60) + (sec/3600);
    },
    convertDDToDMS(dec) {
      let d = Math.floor(dec);
      let m = Math.floor((dec - d) * 60);
      let s = Number(Math.round(((dec - d - m/60) * 3600) + "e2") + "e-2");
      return [
        d,
        m,
        s
      ];
    },
    updateLocationDirection(degrees, direction) {
      if (direction === "S" || direction === "W") {
          degrees = -Math.abs(degrees); 
      }
      
      return degrees;
    }
  }
}
</script>

<style scoped>
  .add-image-button {
    background-color: #D8554D; /* Green */
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    position: fixed;
    left: 1em;
    bottom: 1em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  }
  svg {width: 100%; height: auto;}
</style>