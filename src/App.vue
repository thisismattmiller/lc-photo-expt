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
  padding: 10px;
}
</style>

<style lang='sass'>
  /* Override Bulma theme defaults */
  $primary: #2980b9

  // $size-1: 3.5rem

  @import "../node_modules/bulma/bulma.sass"
</style>
