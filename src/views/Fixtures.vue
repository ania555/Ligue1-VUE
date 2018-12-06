<template>
  <div class="fixtures">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>
      <p></p>
      <div>
        <select v-model="selected">
          <option > </option>
          <option v-for="oneday in matchDayOptions">{{ oneday }}</option>
        </select>  
        <select v-model="selectedTeam">
          <option > </option>
          <option v-for="team in fixtBadge">{{ team.name }}</option>
        </select>  
      </div>
      <div v-for="match in matchDays">
        <h3 v-show="timeHeader(match)">{{ dayDate(match) }}</h3> 
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
      selected: '',
      selectedTeam: '',
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
  computed: {
     matchDayOptions() {
       let allOptions = [];
       allOptions.push(this.allMatches[0].matchday);
       for (let i = 1; i < this.allMatches.length; i++) {
         if (this.allMatches[i].matchday !== this.allMatches[i -1].matchday) {
           allOptions.push(this.allMatches[i].matchday);
         }
       }
       return allOptions; 
     },
    //  toDay() {
    //    let currentDay = this.allMatches[0].season.currentMatchday;
    //    return currentDay;
    //  },
     matchDays() {
       console.log(this.selected); 
       console.log(this.selectedTeam);
       let currentDay = this.allMatches[0].season.currentMatchday; 
        if (this.selected == '' && this.selectedTeam == '') {
          return this.allMatches.filter((match) => {
                    return match.matchday == currentDay;
                })
        }
        else if (this.selected != '' && this.selectedTeam == '') {
          return this.allMatches.filter((match) => {
                    return match.matchday == this.selected;
                })
        } 
         else if (this.selected == '' && this.selectedTeam != '') {
          return this.allMatches.filter((match) => {
                    if (match.homeTeam.name == this.selectedTeam || match.awayTeam.name == this.selectedTeam)
                    return match;
                })   
        }
        else if (this.selected != '' && this.selectedTeam != '') {
          return this.allMatches.filter((match) => {
                    if (match.homeTeam.name == this.selectedTeam || match.awayTeam.name == this.selectedTeam)
                    return match;
                }) 
     }
    }
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
    timeHeader(item) {
      for (let i = 0; i < this.allMatches.length; i++) {
        if ( item === this.allMatches[0]) 
          return true;
        else if ( this.allMatches[i] === item && this.allMatches[i].utcDate === this.allMatches[i-1].utcDate) 
          return false;
        else if ( this.allMatches[i] === item && this.allMatches[i].utcDate !== this.allMatches[i-1].utcDate) 
          return true;
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