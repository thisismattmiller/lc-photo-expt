<template>
  <div id="images">


    <div v-for="person in people">
      <div class="columns header" >
        <div class="column is-one-fifth">
          <img :src="person.thumbUrl"/>
        </div>
        <div class="column auto tombstone">
          <h4>{{person.label}}</h4>
          <div>
            <span>{{person.full_desc}}</span>
            <span>{{person.birth}}s</span>
            <span>{{person.country}}</span>
            <span>{{person.occ}}</span>
            <span>{{person.p21}}</span>
          </div>
        </div>        
      </div>
      <div class="columns">
        <div class="column is-half">
          <div class="image-lc" v-for="image in person.subject" v-bind:style="{backgroundImage: 'url(' + image.i + ')' }" ></div>
        </div>
        <div class="column image-lc-contributors">
          <div class="image-lc" v-for="image in person.contributor" v-bind:style="{backgroundImage: 'url(' + image.i + ')' }" ></div>
        </div>
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

    renderPage: function(page){      
      var self = this;

      self.people = [];
      page.forEach(function(qid){
        self.$http.get('https://s3.amazonaws.com/lc-photo-expt/qjson/'+qid+'.json')
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

            console.log(data)
            self.people.push(data)
        });

      })
    }

  },
  created: function () {

  },
  mounted() {
      this.$root.$on('facetChange', data => {    
       this.renderPage(data.data.pages[0])
      });
  }

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header{
  background-color: whitesmoke;
  border-radius: 19px;
  margin-top: 20px;
}

.tombstone{
  text-align:left;
}
.tombstone span{
  padding-right:10px;
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

}
.image-lc img {
  -moz-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#images{
  float:left;
  width:85%;
}
</style>
