<template>
  <div id="app">
    <Signup/>
  </div>
</template>

<script>
import Signup from './components/visitor/Signup';

export default {
  name: 'App',
  components: {
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
