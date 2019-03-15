<template>
  <div id="browse">


    
    <div class="columns">
      <div class="column"><Facets/></div>
      <div class="column is-10"><Images/></div>
    </div>

    
    
  </div>
</template>

<script>
/* eslint-disable */

import Facets from './Facets.vue'
import Images from './Images.vue'



export default {
  name: 'Browse',
  components:{
    Facets,
    Images
  }

 

}
</script>


<style scoped>

</style>
