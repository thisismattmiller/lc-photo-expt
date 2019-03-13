<template>
  <div id="browse">
    
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column">
        <div class="columns">
          <div class="column is-half">
            Depicts:
          </div>
          <div class="column is-half">
            Contributed To:
          </div>
        </div>        
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-quarter"><Facets/></div>
      <div class="column"><Images/></div>
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
