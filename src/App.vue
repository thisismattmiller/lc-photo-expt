<template>
  <div id="app">

    <Facets/>
    <Images/>
  </div>
</template>

<script>

import Facets from './components/Facets.vue'
import Images from './components/Images.vue'

export default {
  name: 'app',
  components: {
    Facets,
    Images
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
