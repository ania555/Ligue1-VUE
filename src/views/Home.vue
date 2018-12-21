<template>
  <div class="home">
    <div id="homeContainer">
      <br><br><br>
      <img src="images/ball.png" alt="">
      <br><br><br><br><br><br><br>
    </div>
    <div>
      <iframe src="https://taghcountdown.909c.fr/small-en.html"></iframe>
    </div> 
    <div>
      <div v-if="isLoading">
      <p>loading</p>
      </div>  
      <div v-else>
        <h5>Best Scorers</h5>
        <div id="scorersContainer">
          <b-carousel id="scorerCarousel" controls indicators:interval="4000" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

          <!-- Text slides with image -->
          <b-carousel-slide caption="First slide" text="Nulla v" img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                src="https://picsum.photos/1024/480/?image=55" alt="image slot">
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide class="oneImage">
            <img  src="images/ASSE-abstraction.jpg" alt="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </b-carousel-slide>
        </b-carousel>
        <p class="mt-4">
          Slide #: {{ slide }}<br>
          Sliding: {{ sliding }}
        </p> 
      </div>
    </div>

    </div>     
    <!-- <div class="scrollMe">
      <table>
      <thead>
      <tr>
        <th></th>
        <th class="fixHead2">head</th>
        <th class="fixHead3">head</th>
        <th class="FixHead4">head</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>head</th>
        <td class="fixColumn2" >bodytfdtdtfdfd</td>
        <td class="fixColumn3">bodyzfdd</td>
        <td class="fixColumn4">bodyfxfx</td>
      </tr>

      </tbody>
      </table>
    </div> -->
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, 
  },
  data() {
    return {
      isLoading: true,
      allScorers: [],
      slide: 0,
      sliding: null,
    }
  },
  created() {
    let url = "https://api.football-data.org/v2/competitions/FL1/scorers";
    let myHeaders = new Headers({
     "X-Auth-Token": "1ed4b35be67142019d8659de8108d1f7"
    });
    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    };
    fetch(url, myInit).then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log("scorers");
      this.allScorers = json.scorers;
      this.isLoading = false;
      console.log(this.allScorers);
    })
    .catch((error) => {
      console.log("Request failed: " + error.message)
    })
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
  },
}
</script>


<style scoped>

.home {
  background-color: rgb(245, 250, 220);
}
#homeContainer {
  /* background-image: url("~@/assets/french-flag.png"); */
  background-image: url("~@/assets/france-fabrik.png");
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100%;
  height: 100%;
}
img {
  height: 140px;
  width: auto;
  position: relative;
  margin-bottom: 5px;
}
iframe {
  border:none;
  margin-left: 10px;
  background-color: rgb(170,170,170);
  width: 300px;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
}
#scorerCarousel {
  text-shadow: 1px 1px 2px #333;
  background: #ababab;
  
}
.oneImage {
  height: 200px;
}

.scrollMe {
  max-width: 100%;
  max-height: 500px;
  overflow: scroll;
  position: relative;
}
table {
  position: relative;
  border-collapse: collapse;
}
td, th {
  padding: 5px;
  width: 50px;
}
thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  background: #000;
  color: #FFF;
}
thead th:first-child {
  left: 0;
  z-index: 1;
}
.fixHead2 {
  left: 47px;
  z-index: 1;
}
.fixColumn2 {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 47px;
  background: #FFF;
  border-right: 1px solid #CCC;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #FFF;
  border-right: 1px solid #CCC;
}

</style>
