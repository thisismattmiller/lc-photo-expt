<template>
  <div id="facets">
    <div class="facet-group">
      <div>P21 - Sex or Gender</div>
      <ul>
        <li v-for="(item, key) in facetP21">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
        </li>
      </ul>
    </div>
    <div class="facet-group">
      <div>Px - Decade of Birth</div>
      <ul>
        <li v-for="(item, key) in facetBirth">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0], country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0], country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
        </li>
      </ul>
    </div>
    <div class="facet-group">
      <div>Px - Occupation</div>
      <ul>
        <li v-for="(item, key) in facetOcc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:item[0], desc:$route.query.desc}}">{{item[0]}}</router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:item[0], desc:$route.query.desc}}">{{item[0]}}</router-link>
        </li>
      </ul>
    </div>
    <div class="facet-group">
      <div>Px - Country</div>
      <ul>
        <li v-for="(item, key) in facetCountry">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, desc:$route.query.desc}}">{{item[0]}}</router-link>
        </li>
      </ul>
    </div>
    <div class="facet-group">
      <div>Px - Desc</div>
      <ul>
        <li v-for="(item, key) in facetDesc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:item[0].replace(/\s/g,'_')}}">{{item[0]}}</router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:item[0].replace(/\s/g,'_')}}">{{item[0]}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>





export default {
  name: 'Facets',
  data (){
    return {
      facetP21: [],
      facetBirth: [],
      facetOcc: [],
      facetCountry: [],
      facetDesc: []
    }
  },
  props: {
    msg: String
  },
  methods: {  
    processRoute: function(to){
      var url = ''
      if (to.query.p21) url = url + '&p21=' + to.query.p21
      if (to.query.birth) url = url + '&birth=' + to.query.birth
      if (to.query.occ) url = url + '&occ=' + to.query.occ.toLowerCase().replace(/\s/g,'_')
      if (to.query.country) url = url + '&country=' + to.query.country.toLowerCase().replace(/\s/g,'_')
      if (to.query.desc) url = url + '&desc=' + to.query.desc.toLowerCase().replace(/\s/g,'_')

      url = url.replace('&','')
      url = 'https://s3.amazonaws.com/lc-photo-expt/facets/' + url
      this.$http.get(url)
        .then(response => {
          this.processFacets.apply(this,[response])
      });


    },
    processFacets: function(response){
      this.$data.facetP21 = []
      this.$data.facetBirth = []
      this.$data.facetDesc = []
      this.$data.facetOcc = []
      this.$data.facetCountry = []

      
      Object.keys(response.data.facets).forEach((key) => {
        var sortable = [];
        for (var val in response.data.facets[key]) {
            sortable.push([val, response.data.facets[key][val]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });


        if (key === 'p21'){
          this.$data.facetP21 = sortable
        }else if (key === 'birth'){
          this.$data.facetBirth = sortable
        }else if (key === 'desc'){
          this.$data.facetDesc = sortable
        }else if (key === 'occ'){
          this.$data.facetOcc = sortable
        }else if (key === 'country'){
          this.$data.facetCountry = sortable
        }
        //this.$data.facets = 'zzzzzz'

      })  
      this.$root.$emit('facetChange', response);
    }    

  },
  created: function () {
    if (Object.keys(this.$route.query).length === 0){
      this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
        .then(response => {
          this.processFacets.apply(this,[response])
        });
    }else{
      this.processRoute(this.$route)
    }

  },
  watch: {
    '$route' (to, from) {
      this.processRoute(to);
    }
  }  

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#facets{
  float:left;
}


.facet{
  display: block;
  text-align:left;
  text-transform: capitalize;
  text-decoration:none;
}
.facet-hidden{
  display:none;
}
</style>
