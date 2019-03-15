<template>
  <div id="facets">

    <button style="margin: 15px auto 15px auto; display: block;" v-on:click="clearFacets()" v-if="($route.query.p21 || $route.query.birth || $route.query.occ || $route.query.country || $route.query.desc)" class="button info">Clear Facets</button>
    <div style="margin: 25px auto 25px auto; display: block;" v-if="(!$route.query.p21 && !$route.query.birth && !$route.query.occ && !$route.query.country && !$route.query.desc)">&nbsp;</div>

    <div class="facet-group">
      <div class="facet-group-title">P21 - Sex or Gender</div>
      <ul>
        <li v-for="(item, key) in facetP21">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.p21">
          <router-link class="facet" tag="a" :to="{ query: {p21:null, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{$route.query.p21.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>
      </ul>


    </div>
    <div class="facet-group">
      <div class="facet-group-title">P569 - Decade of Birth</div>
      <ul>
        <li v-for="(item, key) in facetBirth">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0], country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreBirth == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0], country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0], country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.birth">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:null, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{$route.query.birth}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreBirth == false && facetBirth.length > 20" v-on:click="facetShowMoreBirth = true">Show Mare</button>
    </div>
    <div class="facet-group">
      <div class="facet-group-title">P106 - Occupation</div>
      <ul>
        <li v-for="(item, key) in facetOcc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:item[0], desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreOcc == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:item[0], desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:item[0], desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

        </li>
        <li v-if="$route.query.occ">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:null, desc:$route.query.desc, page: 1}}"><span>{{$route.query.occ.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreOcc == false && facetOcc.length > 20" v-on:click="facetShowMoreOcc = true">Show More</button>

    </div>
    <div class="facet-group">
      <div class="facet-group-title">P27 - Country</div>
      <ul>
        <li v-for="(item, key) in facetCountry">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreCountry == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.country">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:null, occ:$route.query.occ, desc:$route.query.desc, page: 1}}"><span>{{$route.query.country.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>

      </ul>
      <button class="button is-small" v-if="facetShowMoreCountry == false && facetCountry.length > 20" v-on:click="facetShowMoreCountry = true">Show More</button>
    </div>
    <div class="facet-group">
      <div class="facet-group-title">Description Keywords</div>
      <ul>
        <li v-for="(item, key) in facetDesc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreDesc == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.desc">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:null, page: 1}}"><span>{{$route.query.desc.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>

      </ul>
      <button class="button is-small" v-if="facetShowMoreDesc == false && facetDesc.length > 20" v-on:click="facetShowMoreDesc = true">Show More</button>
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
      facetDesc: [],
      facetShowMoreP21: false,
      facetShowMoreBirth: false,
      facetShowMoreOcc: false,
      facetShowMoreCountry: false,
      facetShowMoreDesc: false
    }
  },
  props: {
    msg: String
  },
  methods: {  
    clearFacets: function(){
      this.$data.facetShowMoreP21 = false;
      this.$data.facetShowMoreBirth = false;
      this.$data.facetShowMoreOcc = false;
      this.$data.facetShowMoreCountry = false;
      this.$data.facetShowMoreDesc = false;
      // this.$route.query.p21 = null;
      // this.$route.query.birth = null;
      // this.$route.query.occ = null;
      // this.$route.query.country = null;
      // this.$route.query.desc= null;
      // this.$route.query.page = 1;
      // this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
      //   .then(response => {
      //     this.processFacets.apply(this,[response])
      //   });
      this.$router.push('/')

    },
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
      this.$route.query.pageCount = response.data.pageCount;
      this.$root.$emit('facetChange', response);
    }    

  },
  created: function () {
    if (Object.keys(this.$route.query).length === 0){

      this.$route.query.page = 1;
      this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
        .then(response => {
          this.processFacets.apply(this,[response])
        });
    }else if (!this.$route.query.p21 && !this.$route.query.birth && !this.$route.query.occ && !this.$route.query.country && !this.$route.query.desc){
      if (!this.$route.query.page){
        this.$route.query.page = 1
      }
      this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
        .then(response => {
          this.processFacets.apply(this,[response])
        });
    
    }else{

      if (!this.$route.query.page){
        this.$route.query.page = 1
      }
      this.processRoute(this.$route)
    }

  },
  watch: {
    '$route' (to, from) {
      if (!this.$route.query.p21 && !this.$route.query.birth && !this.$route.query.occ && !this.$route.query.country && !this.$route.query.desc){
        this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets/all')
          .then(response => {
            this.processFacets.apply(this,[response])
          });

      }

      this.processRoute(to);
    }
  }  

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#facets{
  font-size:0.85em;
}

.facet-group li:hover{
  background-color: rgba(243, 156, 18, 0.51);

}

.facet-group-title{
  font-weight:bold;
}

.facet{
  display: block;
  text-align:left;
  text-transform: capitalize;
  text-decoration:none;
  display:flex;
}
.facet span:first-of-type {
  flex:1
}
.facet-group{
  margin-bottom:20px;
}

.facet-hidden{
  display:none;
}
</style>
