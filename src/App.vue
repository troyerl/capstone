<template>
  <div id="app">
    <Map/>
    <UploadFile/>
  </div>
</template>

<script>
import Map from './components/user/Map';
import UploadFile from './components/user/UploadFile';

export default {
  name: 'App',
  components: {
    Map,
    UploadFile
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100vw;
  height: 100vh;
}
</style>
