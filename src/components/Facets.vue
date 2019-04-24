<template>
  <div id="facets">

    <button style="margin: 15px auto 15px auto; display: block;" v-on:click="clearFacets()" v-if="($route.query.p21 || $route.query.birth || $route.query.birthplace || $route.query.deathplace || $route.query.awards || $route.query.languages || $route.query.occ || $route.query.education || $route.query.country || $route.query.desc)" class="button info">Clear Facets</button>
    <div style="margin: 25px auto 25px auto; display: block;" v-if="(!$route.query.p21 && !$route.query.birth && !$route.query.birthplace && !$route.query.deathplace && !$route.query.occ && !$route.query.education && !$route.query.awards && !$route.query.languages && !$route.query.country && !$route.query.desc)">&nbsp;</div>

    <div class="facet-group">
      <div class="facet-group-title">P21 - Sex or Gender</div>
      <ul>
        <li v-for="(item, key) in facetP21">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:item[0].replace(/\s/g,'_'), birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.p21">
          <router-link class="facet" tag="a" :to="{ query: {p21:null, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{$route.query.p21.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>
      </ul>


    </div>
    <div class="facet-group">
      <div class="facet-group-title">P569 - Decade of Birth</div>
      <ul>
        <li v-for="(item, key) in facetBirth">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0],  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreBirth == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0],  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:item[0],  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.birth">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:null,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{$route.query.birth}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreBirth == false && facetBirth.length > 20" v-on:click="facetShowMoreBirth = true">Show More</button>
    </div>

    <div class="facet-group">
      <div class="facet-group-title">P19 - Place of Birth</div>
      <ul>
        <li v-for="(item, key) in facetBirthplace">
          <router-link v-if="key < 20" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:item[0].replace(/(\s|")/g,"_"), deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreBirthplace == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:item[0].replace(/\s/g,'_'), deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:item[0].replace(/\s/g,'_'), deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.birthplace">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:null, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{$route.query.birthplace}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreBirthplace == false && facetBirthplace.length > 20" v-on:click="facetShowMoreBirthplace = true">Show More</button>
    </div>


    <div class="facet-group">
      <div class="facet-group-title">P570 - Place of Death</div>
      <ul>
        <li v-for="(item, key) in facetDeathplace">
          <router-link v-if="key < 20" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:$route.query.birthplace, deathplace:item[0].replace(/(\s|")/g,"_"), country:$route.query.country, awards:$route.query.awards, languages:$route.query.languages, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreDeathplace == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:$route.query.birthplace, deathplace:item[0].replace(/\s/g,'_'), awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:$route.query.birthplace, deathplace:item[0].replace(/\s/g,'_'), country:$route.query.country, awards:$route.query.awards, languages:$route.query.languages, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.deathplace">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:$route.query.birthplace, deathplace:null, country:$route.query.country, occ:$route.query.occ, awards:$route.query.awards, languages:$route.query.languages, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{$route.query.deathplace}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreDeathplace == false && facetDeathplace.length > 20" v-on:click="facetShowMoreDeathplace = true">Show More</button>
    </div>
    <div class="facet-group">
      <div class="facet-group-title">P106 - Occupation</div>
      <ul>
        <li v-for="(item, key) in facetOcc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:item[0], education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreOcc == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:item[0], education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:item[0], education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

        </li>
        <li v-if="$route.query.occ">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:null, desc:$route.query.desc, page: 1}}"><span>{{$route.query.occ.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreOcc == false && facetOcc.length > 20" v-on:click="facetShowMoreOcc = true">Show More</button>

    </div>


    <div class="facet-group">
      <div class="facet-group-title">P69 - Educated At</div>
      <ul>
        <li v-for="(item, key) in facetEducation">
          <router-link v-if="key < 20" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:item[0].replace(/(\s|")/g,"_"), desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreEducation == true" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ,education:item[0].replace(/(\s|")/g,"_"), desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:item[0].replace(/(\s|")/g,"_"), desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

        </li>
        <li v-if="$route.query.education">
          <router-link class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, education:null, desc:$route.query.desc, page: 1}}'><span>{{$route.query.education}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreEducation == false && facetEducation.length > 20" v-on:click="facetShowMoreEducation = true">Show More</button>

    </div>

    <div class="facet-group">
      <div class="facet-group-title">P166 - Awards Received</div>
      <ul>
        <li v-for="(item, key) in facetAwards">
          <router-link v-if="key < 20" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:item[0].replace(/(\s|")/g,"_"), languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreEducation == true" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:item[0].replace(/(\s|")/g,"_"), languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ,education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:item[0].replace(/(\s|")/g,"_"), languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

        </li>
        <li v-if="$route.query.awards">
          <router-link class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:null, languages:$route.query.languages, country:$route.query.country, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{$route.query.awards.replace(/_/g,' ')}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreEducation == false && facetAwards.length > 20" v-on:click="facetShowMoreEducation = true">Show More</button>

    </div>

    <div class="facet-group">
      <div class="facet-group-title">P1412 - Languages Spoken, Written or Signed</div>
      <ul>
        <li v-for="(item, key) in facetLanguages">
          <router-link v-if="key < 20" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:item[0].replace(/(\s|")/g,"_"), country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreLanguages == true" class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:item[0].replace(/(\s|")/g,"_"), country:$route.query.country, occ:$route.query.occ,education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:item[0].replace(/(\s|")/g,"_"), country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

        </li>
        <li v-if="$route.query.languages">
          <router-link class="facet" tag="a" :to='{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:null, country:$route.query.country, education:$route.query.education, desc:$route.query.desc, page: 1}}'><span>{{$route.query.languages.replace(/_/g,' ')}}</span><span>Remove</span></router-link>          
        </li>


      </ul>
      <button class="button is-small" v-if="facetShowMoreLanguages == false && facetLanguages.length > 20" v-on:click="facetShowMoreLanguages = true">Show More</button>

    </div>
    <div class="facet-group">
      <div class="facet-group-title">P27 - Country</div>
      <ul>
        <li v-for="(item, key) in facetCountry">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, languages:$route.query.languages, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, awards:$route.query.awards, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreCountry == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, languages:$route.query.languages, deathplace:$route.query.deathplace, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, awards:$route.query.awards, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, languages:$route.query.languages, country:item[0].replace(/\s/g,'_'), occ:$route.query.occ, awards:$route.query.awards, education:$route.query.education, desc:$route.query.desc, page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.country">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, country:null, languages:$route.query.languages, occ:$route.query.occ, education:$route.query.education, awards:$route.query.awards, desc:$route.query.desc, page: 1}}"><span>{{$route.query.country.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>

      </ul>
      <button class="button is-small" v-if="facetShowMoreCountry == false && facetCountry.length > 20" v-on:click="facetShowMoreCountry = true">Show More</button>
    </div>
    <div class="facet-group">
      <div class="facet-group-title">Description Keywords</div>

      <ul>
        <li v-for="(item, key) in facetDesc">
          <router-link v-if="key < 20" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
          <router-link v-else-if="facetShowMoreDesc == true" class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>

          <router-link v-else class="facet facet-hidden" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:item[0].replace(/\s/g,'_'), page: 1}}"><span>{{item[0]}}</span><span>({{item[1]}})</span></router-link>
        </li>
        <li v-if="$route.query.desc">
          <router-link class="facet" tag="a" :to="{ query: {p21:$route.query.p21, birth:$route.query.birth,  birthplace:$route.query.birthplace, deathplace:$route.query.deathplace, awards:$route.query.awards, languages:$route.query.languages, country:$route.query.country, occ:$route.query.occ, education:$route.query.education, desc:null, page: 1}}"><span>{{$route.query.desc.replace(/_/,' ')}}</span><span>Remove</span></router-link>          
        </li>

      </ul>
      <button class="button is-small" v-if="facetShowMoreDesc == false && facetDesc.length > 20" v-on:click="facetShowMoreDesc = true">Show More</button>
    </div>
  </div>
</template>

<script>

import md5 from 'md5'




export default {
  name: 'Facets',
  data (){
    return {
      facetP21: [],
      facetBirth: [],
      facetBirthplace: [],
      facetDeathplace: [],
      facetOcc: [],
      facetEducation: [],      
      facetCountry: [],
      facetDesc: [],
      facetAwards: [],      
      facetLanguages: [],
      facetShowMoreP21: false,
      facetShowMoreBirth: false,
      facetShowMoreBirthplace: false,
      facetShowMoreDeathplace: false,
      facetShowMoreOcc: false,
      facetShowMoreEducation: false,
      facetShowMoreCountry: false,
      facetShowMoreAwards: false,
      facetShowMoreLanguages: false,      
      facetShowMoreDesc: false,


      // facetDataBaseURL: 'https://s3.amazonaws.com/lc-photo-expt/facets_new/',
      // facetDataAllURL: 'https://s3.amazonaws.com/lc-photo-expt/facets_new/a/a1/a18/a181a603769c1f98ad927e7367c7aa51',

      facetDataBaseURL: 'http://localhost:8000/',
      facetDataAllURL: 'http://localhost:8000/a/a1/a18/a181a603769c1f98ad927e7367c7aa51'

    }
  },
  props: {
    msg: String
  },
  methods: {  
    clearFacets: function(){
      this.$data.facetShowMoreP21 = false;
      this.$data.facetShowMoreBirth = false;
      this.$data.facetShowMoreBirthplace = false;
      this.$data.facetShowMoreDeathplace = false;      
      this.$data.facetShowMoreOcc = false;
      this.$data.facetShowMoreEducation = false;
      this.$data.facetShowMoreCountry = false;
      this.$data.facetShowMoreDesc = false;
      this.$data.facetShowMoreAwards = false;
      this.$data.facetShowMoreLanguages = false;
      // this.$route.query.p21 = null;
      // this.$route.query.birth = null;
      // this.$route.query.occ = null;
      // this.$route.query.country = null;
      // this.$route.query.desc= null;
      // this.$route.query.page = 1;
      // this.$http.get('https://s3.amazonaws.com/lc-photo-expt/facets_new/a/a1/a18/a181a603769c1f98ad927e7367c7aa51')
      //   .then(response => {
      //     this.processFacets.apply(this,[response])
      //   });
      this.$router.push('/')

    },
    processRoute: function(to){
      var url = ''
      if (to.query.p21) url = url + '&p21=' + to.query.p21
      if (to.query.birth) url = url + '&birth=' + to.query.birth
      if (to.query.birthplace) url = url + '&birthplace=' + to.query.birthplace.toLowerCase().replace(/\s/g,'_').toLowerCase().replace(/"/g,'_')
      if (to.query.deathplace) url = url + '&deathplace=' + to.query.deathplace.toLowerCase().replace(/\s/g,'_').toLowerCase().replace(/"/g,'_')
      if (to.query.country) url = url + '&country=' + to.query.country.toLowerCase().replace(/\s/g,'_')
      if (to.query.desc) url = url + '&desc=' + to.query.desc.toLowerCase().replace(/\s/g,'_')
      if (to.query.occ) url = url + '&occ=' + to.query.occ.toLowerCase().replace(/\s/g,'_')
      if (to.query.education) url = url + '&education=' + to.query.education.toLowerCase().replace(/\s/g,'_').toLowerCase().replace(/"/g,'_')
      if (to.query.awards) url = url + '&awards=' + to.query.awards.toLowerCase().replace(/\s/g,'_').toLowerCase().replace(/"/g,'_')
      if (to.query.languages) url = url + '&languages=' + to.query.languages.toLowerCase().replace(/\s/g,'_').toLowerCase().replace(/"/g,'_')

      // 
      // awards
      // languages

      url = url.replace('&','')

      var urlMd5 = md5(url)
      var path = urlMd5.substring(0, 1) + '/' + urlMd5.substring(0, 2) + '/' + urlMd5.substring(0, 3) + '/'
      
      console.log(url)
      if (url.trim() != ''){


        url = this.$data.facetDataBaseURL + path + urlMd5;
      
        this.$http.get(url)
          .then(response => {
            this.processFacets.apply(this,[response])
        })
        .catch((e) => {
            alert("There was an error requesting that facet combination");
        });          
      }

    },
    processFacets: function(response){
      this.$data.facetP21 = []
      this.$data.facetBirth = []
      this.$data.facetBirthplace = []
      this.$data.facetDeathplace = []
      this.$data.facetDesc = []
      this.$data.facetOcc = []
      this.$data.facetEducation = []
      this.$data.facetCountry = []
      this.$data.facetAwards = []
      this.$data.facetLanguages = []

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
        }else if (key === 'birthplace'){
          this.$data.facetBirthplace = sortable          
        }else if (key === 'deathplace'){
          this.$data.facetDeathplace = sortable          
        }else if (key === 'desc'){
          this.$data.facetDesc = sortable
        }else if (key === 'occ'){
          this.$data.facetOcc = sortable
        }else if (key === 'education'){
          this.$data.facetEducation = sortable          
        }else if (key === 'country'){
          this.$data.facetCountry = sortable
        }else if (key === 'awards'){
          this.$data.facetAwards = sortable
        }else if (key === 'languages'){
          this.$data.facetLanguages = sortable                    
        }
        //this.$data.facets = 'zzzzzz'

      })
      this.$route.query.pageCount = response.data.pages.length;
      this.$root.$emit('facetChange', response);
    }    

  },
  created: function () {
    if (Object.keys(this.$route.query).length === 0){

      this.$route.query.page = 1;
      this.$http.get(this.$data.facetDataAllURL)
        .then(response => {
          this.processFacets.apply(this,[response])
        },
          (err) => {
            console.log(err)
            alert("There was an error requesting that facet combination");
        })
        .catch((e) => {
            console.log(e)
            alert("There was an error requesting that facet combination");
        });
    }else if (!this.$route.query.p21 && !this.$route.query.birth && !this.$route.query.birthplace && !this.$route.query.deathplace && !this.$route.query.awards && !this.$route.query.languages && !this.$route.query.occ && !this.$route.query.education && !this.$route.query.country && !this.$route.query.desc){
      if (!this.$route.query.page){
        this.$route.query.page = 1
      }
      this.$http.get(this.$data.facetDataAllURL)
        .then(response => {
          this.processFacets.apply(this,[response])
        },
          (err) => {
            console.log(err)
            alert("There was an error requesting that facet combination");
        })
        .catch((e) => {
            console.log(e)
            alert("There was an error requesting that facet combination");
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
      if (!this.$route.query.p21 && !this.$route.query.birth && !this.$route.query.birthplace && !this.$route.query.deathplace && !this.$route.query.awards && !this.$route.query.languages && !this.$route.query.occ && !this.$route.query.education && !this.$route.query.country && !this.$route.query.desc){
        this.$http.get(this.$data.facetDataAllURL)
          .then(response => {
            this.processFacets.apply(this,[response])
          },
          (err) => {
            console.log(err)
            alert("There was an error requesting that facet combination");
          }
          )
          .catch((e) => {
              console.log(e)
              alert("There was an error requesting that facet combination");
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
