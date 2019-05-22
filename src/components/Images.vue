<template>
  <div id="images">


    <div class="columns" >
      <div class="column is-one-third is-clearfix">
        <router-link  :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: (parseInt($route.query.page)-1 >= 1) ? (parseInt($route.query.page)-1) : $route.query.page }}" class="button is-pulled-left" tag="button" :disabled="parseInt($route.query.page) == 1">Previous Page ({{$route.query.page}}/{{$route.query.pageCount}})</router-link>    
      </div>
      <div class="column is-one-third image-explaination">
        <!-- <span>Images: Left side depict subject, right side are works created by subject.</span> -->


      </div>
      <div class="column is-one-third is-clearfix">
        
        <router-link  :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: (parseInt($route.query.page)+1 <= parseInt($route.query.pageCount)) ? (parseInt($route.query.page)+1) : $route.query.page }}" tag="button" :disabled="parseInt($route.query.page) == parseInt($route.query.pageCount)"  class="button is-pulled-right">Next Page ({{$route.query.page}}/{{$route.query.pageCount}})</router-link>    
      </div>

    </div>

      <div v-for="(person, personCount) in people">
      <div class="columns header" data-popuptext="Wikidata supplied image and metadata" >
        <div class="column">
          <span v-if="personCount == 0" class="wikidata-data-label">Wikidata Metadata</span>
          <img onerror="this.style.display='none'" :alt="'Image from Wikimedia Commons depicting ' + person.label" :title="'Image from Wikimedia Commons depicting ' + person.label" :src="person.thumbUrl"/>
        </div>
        <div class="column is-11 tombstone">
          <h5 class="is-size-5"><a :href="'https://www.wikidata.org/wiki/'+person.qid" target="_blank"> {{person.label}}</a></h5>
          <div>
            <span v-if="person.full_desc">{{person.full_desc+'&nbsp;|&nbsp;'}}</span>
            <span v-if="person.birth">{{person.birth+'s&nbsp;|&nbsp;'}}</span>
            <span v-if="person.country">{{person.country+'&nbsp;|&nbsp;'}}</span>
            <span v-if="person.occ.length>0">{{person.occ.join(', ')+'&nbsp;|&nbsp;'}}</span>
            <span v-if="person.p21">{{person.p21+'&nbsp;|&nbsp;'}}</span>
            <a href="#" title="View Wikipedia Article"  v-on:click="gotoWiki(person.qid,$event)">View Wiki</a>
            <div v-for="wikiLink in person.wikiLinks">
                <span>{{wikiLink.p}}</span><a target="_blank" :href="wikiLink.u">{{wikiLink.t}}</a>
            </div>
          </div>
        </div>        
      </div>
      <div class="columns">
        <div class="column is-half image-lc-container">
          <div v-if="personCount == 0"  class="image-header-note">Resources from Library of Congress where the entity is the subject of the image.</div>
          <a v-for="image in person.subject" target="_blank" :href="image.l.replace('http://www.loc.gov/pictures/item/','https://www.loc.gov/item/')" >
            <div class="image-lc image-lc-subject" data-popupleft="100px" :data-popuptext="image.t" v-bind:style="{backgroundImage: 'url(' + image.i + ')' }" ></div>
          </a>
          <!-- <span class="image-catagory">Depicts</span> -->
          <br v-if="person.totalSubjectPages > 0 && person.loadedAllSubjects == false"/>
          <button class="button" v-on:click="loadMoreImages(person.qid,'subject')" v-if="person.totalSubjectPages > 0 && person.loadedAllSubjects == false">Show More ({{person.totalSubjectPages*25}} Total)</button>
        </div>
        <div class="column image-lc-contributors image-lc-container">
          <div v-if="personCount == 0"  class="image-header-note">Resources from Library of Congress where the entity contributed to its creation.</div>

          <a v-for="image in person.contributor" target="_blank" :href="image.l.replace('http://www.loc.gov/pictures/item/','https://www.loc.gov/item/')" >
            <div class="image-lc image-lc-contributor" :data-popuptext="image.t" v-bind:style="{backgroundImage: 'url(' + image.i + ')' }" ></div>
          </a>
          <br v-if="person.totalContributorPages > 0 && person.loadedAllContributors == false"/>
          <button class="button" v-on:click="loadMoreImages(person.qid,'contributor')" v-if="person.totalContributorPages > 0 && person.loadedAllContributors == false">Show More ({{person.totalContributorPages*25}} Total)</button>


                    <!-- <span class="image-catagory">Created</span> -->

        </div>
      </div>
      


    </div>

    <div class="columns" >
      <div class="column is-one-third is-clearfix">
        <router-link  :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: (parseInt($route.query.page)-1 >= 1) ? (parseInt($route.query.page)-1) : $route.query.page }}" class="button is-pulled-left" tag="button" :disabled="parseInt($route.query.page) == 1">Previous Page ({{$route.query.page}}/{{$route.query.pageCount}})</router-link>    
      </div>
      <div class="column is-one-third image-explaination">



      </div>
      <div class="column is-one-third is-clearfix">
        
        <router-link  :to="{ query: {p21:$route.query.p21, birth:$route.query.birth, country:$route.query.country, occ:$route.query.occ, desc:$route.query.desc, page: (parseInt($route.query.page)+1 <= parseInt($route.query.pageCount)) ? (parseInt($route.query.page)+1) : $route.query.page }}" tag="button" :disabled="parseInt($route.query.page) == parseInt($route.query.pageCount)"  class="button is-pulled-right">Next Page ({{$route.query.page}}/{{$route.query.pageCount}})</router-link>    
      </div>

    </div>



  </div>


</template>

<script>
/* eslint-disable */
import md5 from 'md5'


export default {
  name: 'Images',
  data (){
    return {
      people:[]
    }
  },
  props: {
    msg: String
  },
  methods:{


    loadMoreImages: function(qid,type){

      this.$data.people.forEach((p)=>{
        if (p.qid == qid){

          if (type == 'subject'){
            var images = p.subject
            var totalPagesVar = 'totalSubjectPages'
            var allDoneVar = 'loadedAllSubjects'
          }else{
            var images = p.contributor
            var totalPagesVar = 'totalContributorPages'
            var allDoneVar = 'loadedAllContributors'
          }
          
          var nextPage = parseInt(images.length / 25)

          if (nextPage <= (p[totalPagesVar])){
            //Q23_subject_page_1.json
            var url = `https://s3.amazonaws.com/lc-photo-expt/data_qjson/${qid}_${type}_page_${nextPage}.json`
            this.$http.get(url)
              .then(response => {
                var data = response.data;
                data.forEach((i)=>{
                  i.i = 'data:image/png;base64,' + i.i;
                  p[type].push(i)
                })       

                nextPage = parseInt(p[type].length / 25)        
                if (nextPage >= (p[totalPagesVar])){
                  p[allDoneVar]=true;
                }
            });
          }else{
            p[allDoneVar]=true;
          }




        }
      })



    },

    gotoWiki: function(qid,event){
      if (event) event.preventDefault()
      this.$http.get('https://www.wikidata.org/w/api.php?action=wbgetentities&ids='+qid+'&props=sitelinks&origin=*&format=json',          
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        )
      .then(response => {

        
        if (response.data && response.data.entities && response.data.entities[qid]){

          
          var links = []

          if (response.data.entities[qid].sitelinks.enwiki){
            links.push({p: 'EN',t:response.data.entities[qid].sitelinks.enwiki.title,u:'http://en.wikipedia.org/wiki/'+response.data.entities[qid].sitelinks.enwiki.title})
          }
          if (response.data.entities[qid].sitelinks.commonswiki){
            links.push({p: 'Commons (media)',t:response.data.entities[qid].sitelinks.commonswiki.title,u:'http://commons.wikipedia.org/wiki/'+response.data.entities[qid].sitelinks.commonswiki.title})
          }
          Object.keys(response.data.entities[qid].sitelinks).forEach((site)=>{

            if (site != 'enwiki' && site != 'commonswiki'){

              var lang = site.replace('wiki','')
              var langUC = lang.toUpperCase();
              if (lang == 'simple'){
                langUC = 'Simple'
              }              
              var title = response.data.entities[qid].sitelinks[site].title
              var url = 'http://'+lang+'.wikipedia.org/wiki/'+title
              links.push({p: langUC, t:title,u:url})

            }

          })

          this.$data.people.forEach((p)=>{
            if (p.qid === qid){
              p.wikiLinks = links
            }
          })
          
        }




      });

      


    },
    renderPage: function(page){      
      var self = this;

      self.people = [];
      page.forEach(function(qid){
        self.$http.get('https://s3.amazonaws.com/lc-photo-expt/data_qjson/'+qid+'.json')
          .then(response => {
            var data = response.data
            data.thumbUrl = ''
            if (data.image){
              data.image = data.image.replace(/\s/g,'_')
              var md5Val = md5(data.image)
              data.thumbUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5Val.substring(0,1)}/${md5Val.substring(0,2)}/${data.image}/50px-${data.image}`
            }
            if (!data.subject) data.subject = [];
            if (!data.contributor) data.contributor = [];
            data.subject.forEach((i)=>{
              i.i = 'data:image/png;base64,' + i.i;
            })
            data.contributor.forEach((i)=>{
              i.i = 'data:image/png;base64,' + i.i;
            })
            data.wikiLinks=[];
            data.currentSubjectPage  = 0;
            data.currentContributorPage  = 0;

            data.loadedAllSubjects = false;
            data.loadedAllContributors = false;


            self.people.push(data)
        });
        window.scrollTo(0,0);  

      })
    }

  },
  created: function () {

  },
  mounted() {
      this.$root.$on('facetChange', data => {   
        if (!this.$route.query.page){
          this.$route.query.page = 1;
        } 
       this.renderPage(data.data.pages[parseInt(this.$route.query.page)-1])
      });
  }

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header{
  /* background-color: rgba(243, 156, 18, 0.51);*/
background: rgb(229,229,229); /* Old browsers */
background: -moz-linear-gradient(left, rgba(229,229,229,1) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left, rgba(229,229,229,1) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right, rgba(229,229,229,1) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e5e5e5', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */
  border-radius: 5px;
  margin-top: 20px;
  position: relative;
}
.header:hover{
  background-color:blue !important;
  }

.image-lc-container{
  position: relative;

}
.tombstone{
  text-align:left;
}
.tombstone span{
  /*padding-right:10px;*/
}
.image-lc-contributors{
  position: relative;

}
.image-lc-contributors:before {
    position: absolute;
    content: '';
    border-left: 3px solid lightgrey;
    width: 2px;
    height: 90%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    left: 0%;
}

.image-lc{
  height:100px;
  width:100px;
  background-size: cover;
  background-position-y: center;
  background-repeat: no-repeat;
  display:inline-block;
  transition-duration: 200ms;
  transition-property: transform;
  position: relative;
  cursor: pointer;  
  margin:5px;
}
.image-lc:hover{
  transform: scale(2.5);
  z-index:1000;
}
.image-lc:after {
  content: attr(data-popuptext);
  background: rgba(213, 213, 213, 0.95);
  border-radius: 1px;
  opacity: 0;
  top: 0px;
  position: absolute;
  transition: 100ms ease;
  white-space: wrap;
  max-width:100px;
  width:100px;
  font-size:0.35em;
  font-weight:bold;
}
.image-lc:hover:after {
  opacity: 1;
  padding: .4em;
}
.image-lc-subject:after{
  left: 105px;
}
.image-lc-contributor:after{
  left: -105px;
}


.image-catagory{
      position: absolute;
    left: 0;
    top: 0;
    font-size: 4em;
    z-index: -1;
    opacity: 0.07;
    font-weight: bolder;
}

.image-explaination{
  text-align:center;
}
.wikidata-data-label{
    font-size: 0.7em;
    position: absolute;
    top: 1px;
    left: 45.5%;
}
.image-header-note{
  font-size: 0.75em;
  background-color: lightgoldenrodyellow;
  text-align: center;
}








</style>
