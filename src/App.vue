<template>
  <div id="app">
    <!-- <Map/>
    <UploadFile/> -->
    <Signup/>
  </div>
</template>

<script>
// import Map from './components/user/Map';
// import UploadFile from './components/user/UploadFile';
import Signup from './components/visitor/Signup';

export default {
  name: 'App',
  components: {
    // Map,
    // UploadFile
    Signup
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
  overflow: hidden;
}
</style>
