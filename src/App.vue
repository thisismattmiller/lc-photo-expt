<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Browse from './components/Browse.vue'


export default {
  name: 'app',
  components: {
    Browse
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

<style lang='sass'>
  /* Override Bulma theme defaults */
  $primary: #4c4c6e

  $size-1: 3.5rem

  @import "../node_modules/bulma/bulma.sass"
</style>
