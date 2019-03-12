<template>
  <div id="facets">

  <span>P21 - Sex or Gender</span>
  <ul>
    <li v-for="(item, key) in facetP21">
      <a href="#" v-if="key < 20" v-on:click="setFacet(['p21',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
      <a href="#" class="facet facet-hidden" v-else v-on:click="setFacet(['p21',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
    </li>
  </ul>
  <span>P21 - Birth Decade</span>
  <ul>
    <li v-for="(item, key) in facetBirth">
      <a href="#" v-if="key < 20" v-on:click="setFacet(['birth',item[0]])">{{ item[0] }}s ({{ item[1] }})</a>
      <a href="#" class="facet facet-hidden" v-else v-on:click="setFacet(['birth',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
    </li>
  </ul>
  <span>P21 - Occupation</span>
  <ul>
    <li v-for="(item, key) in facetOcc">
      <a href="#" v-if="key < 20" v-on:click="setFacet(['occ',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
      <a href="#" class="facet facet-hidden" v-else v-on:click="setFacet(['occ',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
    </li>
  </ul>
  <span>P21 - Keyword</span>
  <ul>
    <li v-for="(item, key) in facetDesc">
      <a href="#" v-if="key < 20" v-on:click="setFacet(['desc',item[0]])()">{{ item[0] }} ({{ item[1] }})</a>
      <a href="#" class="facet facet-hidden" v-else v-on:click="setFacet(['desc',item[0]])">{{ item[0] }} ({{ item[1] }})</a>
    </li>
  </ul>


  </div>
</template>

<script>


function processFacets(self,response){

  self.facetP21 = []
  self.facetBirth = []
  self.facetDesc = []
  self.facetOcc = []

  
  Object.keys(response.data.facets).forEach(function(key){
    var sortable = [];
    for (var val in response.data.facets[key]) {
        sortable.push([val, response.data.facets[key][val]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });


    if (key === 'p21'){
      self.facetP21 = sortable
    }else if (key === 'birth'){
      self.facetBirth = sortable
    }else if (key === 'desc'){
      self.facetDesc = sortable
    }else if (key === 'occ'){
      self.facetOcc = sortable
    }
    //self.facets = 'zzzzzz'

  })  

}


export default {
  name: 'Facets',
  data (){
    return {
      facetP21: [],
      facetBirth: [],
      facetOcc: [],
      facetBirth: [],
      facetDesc: [],
      facetsActive: { 'p21': null, 'occ':null, 'desc':null,'birth':null}
    }
  },
  props: {
    msg: String
  },
  methods: {
    setFacet: function (setTo,event) {
      
      this.facetsActive[setTo[0]] = setTo[1].toLowerCase().replace(/\s/g,'_')
      console.log(this.facetsActive)

      // ['p21','birth','occ','country']#,'desc']
      var url = ""

      if (this.facetsActive.p21 !== null) url = url + '&p21='+this.facetsActive.p21
      if (this.facetsActive.birth !== null) url = url + '&birth='+this.facetsActive.birth
      if (this.facetsActive.occ !== null) url = url + '&occ='+this.facetsActive.occ
      if (this.facetsActive.desc !== null) url = url + '&desc='+this.facetsActive.desc

      url = url.replace('&','')
      url = 'https://s3.amazonaws.com/lc-photo-expt/facets/' + url

      this.$http.get(url)
        .then(response => {
          processFacets(this,response)

          this.$root.$emit('facetChange', response);
      });
      if (event) event.preventDefault()
    }
  },
  created: function () {
    this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
      .then(response => {
        processFacets(this,response)
      });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

#facets{
  float:left;
}

.facet-hidden{
  display:none;
}
</style>
