<template>
  <div class="home">
 
    <div v-if="isLoading">
      <p>loading</p>
    </div>  
    <div v-else>
      <div id="homeContainer">
        <br>
        <div>
          <iframe id="timer" src="https://taghcountdown.909c.fr/small-en.html"></iframe>
        </div><br>  
        <h3>BEST SCORERS</h3>
      </div>
      <div id="scorersContainer">
        <b-carousel id="scorerCarousel" controls indicators:interval="4000" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
          <b-carousel-slide class="oneImage" v-for="(scorer, i) in allScorers" :key="i">
            <div class="sContainer">
              <p class="ordNumbScor" v-bind:style='{ color: myBackground(scorer)}'>{{ i + 1 }}</p>
              <p class="scorerName">{{ scorer.player.name }}</p>
              <div class="oneScorerSet">
                <div class="sData">
                  <!-- <p>{{ scorer.player.position }}</p> -->
                  <div class="nationality">
                    <p>{{ scorer.player.nationality }}</p>
                    <span><img class="flag" :src="myFlag(scorer)"></span>
                  </div>
                  <!-- <p>{{ scorer.player.shirtNumber }}</p> -->
                  <p>{{ myTeam(scorer) }}</p>
                  <p class="myScore">{{ scorer.numberOfGoals }} goals</p> 
                </div>              
                <img class="playerPic" :src="myPhoto(scorer)" alt="">
              </div>
              <div class="stripeBadge"  v-bind:style='{ backgroundColor: myBackground(scorer)}'>
                <div class="circleBadge">
                  <img class="badgePic"  :src="myBadge(scorer)" alt="">
                </div>
              </div>
            </div>  
          </b-carousel-slide>
        </b-carousel>
    </div>
    <div class="cover"></div> 
  </div>
        
   <!-- <img src="images/ball.png" alt=""> -->
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
        {id: 3374, scorerPhoto: "images/Kylian-Mbappe.jpg", nationality: "images/fra.png"},
        {id: 8705, scorerPhoto: "images/Emiliano-Sala.jpg", nationality: "images/arg.png"},
        {id: 8412, scorerPhoto: "images/Nicolas-Pepe.jpg", nationality: "images/ivo.png"},
        {id: 3370, scorerPhoto: "images/Florian-Thauvin.jpg", nationality: "images/fra.png"},
        {id: 8491, scorerPhoto: "images/Neymar-Jr.jpg", nationality: "images/bre.png"},
        {id: 3170, scorerPhoto: "images/Edinson-Cavani.jpg", nationality: "images/uru.png"},
        {id: 3598, scorerPhoto: "images/Wahbi-Khazri.jpg", nationality: "images/tun.png"},
        {id: 1043, scorerPhoto: "images/Lebo-Mothiba.jpg", nationality: "images/saf.png"},
        {id: 8547, scorerPhoto: "images/Jonathan-Bamba.jpg", nationality: "images/fra.png"},
        {id: 8518, scorerPhoto: "images/Francois-Kamano.jpg", nationality: "images/gui.png"},
        {id: 8311, scorerPhoto: "images/Max-Alain-Gradel.jpg", nationality: "images/ivo.png"},
        {id: 8517, scorerPhoto: "images/Gaetan-Laborde.jpg", nationality: "images/fra.png"},
        {id: 3739, scorerPhoto: "images/Radamel-Falcao.jpg", nationality: "images/col.png"}
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
    },
    myFlag(item) {
      for (let i = 0; i < this.scorPhotos.length; i++) {
        if(this.scorPhotos[i].id === item.player.id) 
        return this.scorPhotos[i].nationality;
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
  background-image: url("~@/assets/french-flag.png");
  /* background-image: url("~@/assets/france-fabrik.png"); */
  background-position: center;
  /* background-repeat: repeat-y; */
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
img {
  height: 50px;
  width: auto;
  position: relative;
  margin-bottom: 5px;
}
#timer {
  border:none;
  margin-left: 10px;
  background-color: rgb(170,170,170);
  width: 300px;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
}
h3 {
  color: black;
  font-weight: 600;
  background-color: rgba(150,150,150,0.4);
  width: 100%;
  padding: 5px;
  align-self: center;
}
#scorersContainer {
  position: relative;
  bottom: 10px;
}
.scorerName {
  position: relative;
  top: 63px;
  font-size: 24px;
}
.ordNumbScor {
  position: relative;
  top: 130px;
  right: 120px;
  font-size: 42px;
  font-weight: bold;
}

#scorerCarousel {
  text-shadow: 1px 1px 2px #333;
  background-image: url("~@/assets/Ligue-1-blue.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 310px;
}
.oneImage {
  padding-top: 0px;
  height: 310px;
  width: 100%;
  /* background-color: rgba(100, 100, 100, 0.9); */
  background: -moz-linear-gradient(-45deg, rgba(100,100,100,0.9) 0%, rgba(146,146,146,0.9) 47%, rgba(137,137,137,0.9) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(100,100,100,0.9)), color-stop(47%, rgba(146,146,146,0.95)), color-stop(100%, rgba(167,167,167,0.9)));
  background: -webkit-linear-gradient(-45deg, rgba(100,100,100,0.9) 0%, rgba(146,146,146,0.9) 47%, rgba(167,167,167,0.9) 100%);
  background: -o-linear-gradient(-45deg, rgba(100,100,100,0.9) 0%, rgba(146,146,146,0.9) 47%, rgba(167,167,167,0.9) 100%);
  background: -ms-linear-gradient(-45deg, rgba(100,100,100,0.9) 0%, rgba(146,146,146,0.9) 47%, rgba(167,167,167,0.9) 100%);
  background: linear-gradient(135deg, rgba(100,100,100,0.9) 0%, rgba(146,146,146,0.9) 47%, rgba(167,167,167,0.9) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 );
}
.sContainer {
  position: relative;
  width: 143%;
  margin-left: -21.5%; 
}
.sData {
  position: relative;
  top: 30px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: flex-start;
}
.playerPic {
  height: 200px;
  width: auto;
}
.oneScorerSet {
  position: relative;
  top: 50px;
  left: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 76%;
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
.cover {
  position: relative;
  margin-top: -50px;
  height: 70px;
  background-image: url("~@/assets/french-flag.png");
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100%;
  border: 0px;
}

@media only screen and (orientation: landscape) {
  .stripeBadge {
  padding: 5px 0px 5px 150px;
  }
  .oneScorerSet {
  position: relative;
  top: 50px;
  left: 27%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 47%;
  }
  .ordNumbScor {
  position: relative;
  top: 130px;
  right: 145px;
  font-size: 42px;
  font-weight: bold;
  }
}

@media only screen and (min-width: 380px) {
  .stripeBadge {
  padding: 5px 0px 5px 50px;
  }
  .oneScorerSet {
  position: relative;
  top: 50px;
  left: 17%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 68%;
  }
  .ordNumbScor {
  position: relative;
  top: 130px;
  right: 130px;
  font-size: 42px;
  font-weight: bold;
  }
}

.flag {
  height: 20px;
  margin-left: 12px;
  margin-top: 2px;
}
.nationality {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
