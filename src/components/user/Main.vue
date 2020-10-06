<template>
  <div class="main">
    <Map/>
    <UploadFile/>
  </div>
</template>

<script>
import Map from './Map';
import UploadFile from './UploadFile';

export default {
  name: 'Main',
  components: {
    Map,
    UploadFile
  }
}
</script>

<style>

</style>