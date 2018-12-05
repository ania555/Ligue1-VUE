<template>
  <div class="fixtures">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>
      <div v-for="match in allMatches">
        <h3>{{ dayDate(match) }}</h3> 
        <table class="table">
          <tbody>
            <tr>
              <td>
                <img :src="myHomeBadge(match)" alt="">
                <p>{{ match.homeTeam.name.toUpperCase() }}</p>
              </td>
              <td>
                <br>
                <p>{{ match.score.fullTime.homeTeam }}:{{ match.score.fullTime.awayTeam }}</p>
                <p>{{ myVenue(match) }}</p>
                </td>
              <td>
                <img :src="myAwayBadge(match)" alt="">
                <p>{{ match.awayTeam.name.toUpperCase() }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
    <!-- <game :allMatches="matchesFr" :myfruit="fruit" :gameBadges="fixtBadge"/> -->
  </div>
</template>



<script>
import Game from '@/components/Game.vue'
import moment from 'moment'

export default {
    name: 'fixtures',
  components: {
    Game,
  },
  data() {
    return {
      num: 25,
      isLoading: true,
      allMatches: [],
      fruit: "orange",
      fixtBadge: [],
      i: 1,
    }
  },
   mounted() {
    console.log(this.$route.params.teamsforSchedule)
     if(!this.$route.params.teamsforSchedule) {
       this.fixtBadge = this.$parent.teamLogos
     } else {
       this.fixtBadge = this.$route.params.teamsforSchedule
     }
  },
  created() {
    let url = "https://api.football-data.org/v2/competitions/FL1/matches";
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
                    console.log("matches");
                    this.allMatches = json.matches;
                    this.isLoading = false;
                    console.log(this.allMatches);
                })
                .catch((error) => {
                    console.log("Request failed: " + error.message)
                })
  },
  methods: {
    dayDate(date) {
      let myDay = moment(date.utcDate).format("dddd D MMMM YYYY [|] HH:mm").toUpperCase();
      return myDay;
    },
    dayTime(date) {
      let myTime = moment(date).format("HH:mm");
      return myTime; 
    },
    myHomeBadge(item) {
      for (let i = 0; i < this.fixtBadge.length; i++) {
        if(this.fixtBadge[i].id === item.homeTeam.id) 
        return this.fixtBadge[i].crestUrl;
      } 
    },
    myAwayBadge(item) {
      for (let i = 0; i < this.fixtBadge.length; i++) {
        if(this.fixtBadge[i].id === item.awayTeam.id) 
        return this.fixtBadge[i].crestUrl;
      } 
    },
    myVenue(item) {
      for (let i = 0; i < this.fixtBadge.length; i++) {
        if(this.fixtBadge[i].id === item.homeTeam.id) 
        return this.fixtBadge[i].venue.toUpperCase();
      } 
    },
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
   height: 70px;
}
</style>