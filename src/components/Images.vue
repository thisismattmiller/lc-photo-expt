<template>
  <div id="images">
    <div v-for="person in people">
      {{ person.thumbUrl }}

      <img class="image-lc" v-for="image in person.subject" :src="image.i">


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
      page.forEach(function(qid){
        self.$http.get('https://s3.amazonaws.com/lc-photo-expt/qjson/'+qid+'.json')
          .then(response => {
            var data = response.data
            data.thumbUrl = ''
            if (data.image){
              data.image = data.image.replace(/\s/g,'_')
              var md5Val = md5(data.image)
              data.thumbUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5Val.substring(0,1)}/${md5Val.substring(0,2)}/${data.image}/100px-${data.image}`
            }
            data.subject.forEach((i)=>{
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

.image-lc{

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
