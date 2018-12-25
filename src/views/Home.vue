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
            <b-carousel-slide class="oneImage" v-for="(scorer, i) in allScorers" :key="i">
              <div class="sContainer">
                <h4>{{ i + 1 }} {{ scorer.player.name }}</h4><br>
                <div class="sData">
                  <!-- <p>{{ scorer.player.position }}</p> -->
                  <p>{{ scorer.player.nationality }}</p>
                  <!-- <p>{{ scorer.player.shirtNumber }}</p> -->
                  <p>{{ myTeam(scorer) }}</p>
                  <p class="myScore">{{ scorer.numberOfGoals }}</p>
                </div>
                <img class="playerPic" :src="myPhoto(scorer)" alt="">
                <div class="stripeBadge"  v-bind:style='{ backgroundColor: myBackground(scorer)}'>
                  <div class="circleBadge">
                    <img class="badgePic"  :src="myBadge(scorer)" alt="">
                  </div>
                </div>
              </div>  
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
      homeBadge: [],
      slide: 0,
      sliding: null,
      scorPhotos: [
        {id: 3374, scorerPhoto: "images/Kylian-Mbappe.jpg"},
        {id: 8705, scorerPhoto: "images/Emiliano-Sala.jpg"},
        {id: 8412, scorerPhoto: "images/Nicolas-Pepe.jpg"},
        {id: 3370, scorerPhoto: "images/Florian-Thauvin.jpg"},
        {id: 8491, scorerPhoto: "images/Neymar-Jr.jpg"},
        {id: 3170, scorerPhoto: "images/Edinson-Cavani.jpg"},
        {id: 3598, scorerPhoto: "images/Wahbi-Khazri.jpg"},
        {id: 1043, scorerPhoto: "images/Lebo-Mothiba.jpg"},
        {id: 8547, scorerPhoto: "images/Jonathan-Bamba.jpg"},
        {id: 8518, scorerPhoto: "images/Francois-Kamano.jpg"},
      ],
    }
  },
  mounted() {
    console.log(this.$route.params.teamsforHome)
     if(!this.$route.params.teamsforHome) {
       this.homeBadge = this.$parent.teamLogos
     } else {
       this.homeBadge = this.$route.params.teamsforHome
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
    myBadge(item) {
      for (let i = 0; i < this.homeBadge.length; i++) {
        if(this.homeBadge[i].id === item.team.id) 
        return this.homeBadge[i].crestUrl;
      }
    },
    myBackground(item) {
      for (let i = 0; i < this.homeBadge.length; i++) {
        if(this.homeBadge[i].id === item.team.id) 
        return this.homeBadge[i].color;
      }
    },
    myTeam(item) {
      for (let i = 0; i < this.homeBadge.length; i++) {
        if(this.homeBadge[i].id === item.team.id) 
        return this.homeBadge[i].shortName;
      }
    },
    myPhoto(item) {
      for (let i = 0; i < this.scorPhotos.length; i++) {
        if(this.scorPhotos[i].id === item.player.id) 
        return this.scorPhotos[i].scorerPhoto;
      }
    }
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
  background-image: url("~@/assets/Ligue-1-blue.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 350px;
}
.oneImage {
  padding: 0px;
  height: 350px;
  width: 100%;
  background-color: rgba(100, 100, 100, 0.9);
}
.sContainer {
  position: relative;
  width: 143%;
  margin-left: -21.5%; 
}
.ordNumbScor {
  position: relative;
  margin: 0px 0px -30px -240px;
}
.sData {
  position: relative;
  margin: 0px 0px -150px 60px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}
.myScore {
  font-size: 32px;
}
.playerPic {
  position: relative;
  margin: 0px 0px -45px 140px;
  height: 200px;
  width: auto;
}
.stripeBadge {
  padding: 5px 0px 5px 35px;
}
.circleBadge {
  width: 60px;
  background-color: whitesmoke;
  padding: 10px 0px 5px 0px;
  border-radius: 45px;
}
.badgePic {
  height: 40px;
  width: auto;
}





/* .scrollMe {
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
} */
thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  background: #000;
  color: #FFF;
}
/* thead th:first-child {
  left: 0;
  z-index: 1;
}
.fixHead2 {
  left: 47px;
  z-index: 1;
} */
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
