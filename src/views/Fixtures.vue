<template>
  <div class="fixtures">
    <div id="loader" v-if="isLoading">
      <div class="sk-cube-grid">
				<div class="sk-cube sk-cube1"></div>
				<div class="sk-cube sk-cube2"></div>
				<div class="sk-cube sk-cube3"></div>
				<div class="sk-cube sk-cube4"></div>
				<div class="sk-cube sk-cube5"></div>
				<div class="sk-cube sk-cube6"></div>
				<div class="sk-cube sk-cube7"></div>
				<div class="sk-cube sk-cube8"></div>
				<div class="sk-cube sk-cube9"></div>
			</div>
    </div>
    <div v-else>
      <div class="container">
        <br>
      <div>
        <b-form-select class="selectMe" v-model="selected">
          <option>Select day</option>
          <option v-for="(oneday, i) in matchDayOptions" :key="i">{{ oneday }}</option>
        </b-form-select>  
        <b-form-select class="selectMe" v-model="selectedTeam">
          <option>Select team</option>
          <option v-for="(team, i) in fixtBadge" :key="i">{{ team.name }}</option>
        </b-form-select>  
      </div>
      <div v-for="(match, i) in matchDays" :key="i">
        <div class="timeContainer">
            <h6 v-show="timeHeader(match)"><strong>{{ dayDate(match) }}</strong></h6>  
        </div>
        <table class="">
          <tbody>
            <tr>
              <td class="teamContainer">
                <img :src="myHomeBadge(match)" alt="">
                <p>{{ myHomeTeam(match) }}</p>
              </td>
              <td class="scoreTd">
                <p class="myScore"><strong>{{ match.score.fullTime.homeTeam }} - {{ match.score.fullTime.awayTeam }}</strong></p>
                <p class="venue">{{ myVenue(match) }}</p>
              </td>
              <td class="teamContainer">
                <img :src="myAwayBadge(match)" alt="">
                <p>{{ myAwayTeam(match) }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>



<script>
import moment from 'moment'

export default {
  name: 'fixtures',
  components: {
  },
  data() {
    return {
      num: 25,
      isLoading: true,
      allMatches: [],
      fruit: "orange",
      fixtBadge: [],
      selected: 'Select day',
      selectedTeam: 'Select team',
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
       console.log(currentDay);
        if (this.selected == 'Select day' && this.selectedTeam == 'Select team') {
          return this.allMatches.filter((match) => {
                    return match.matchday == currentDay;
          })
        }
        else if (this.selected != 'Select day' && this.selectedTeam == 'Select team') {
          return this.allMatches.filter((match) => {
            return match.matchday == this.selected;
          })
        } 
         else if (this.selected == 'Select day' && this.selectedTeam != 'Select team') {
          return this.allMatches.filter((match) => {
            if (match.homeTeam.name == this.selectedTeam || match.awayTeam.name == this.selectedTeam)
              return match;
            })   
        }
        else if (this.selected != 'Select day' && this.selectedTeam != 'Select team') {
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
    myHomeTeam(item) {
      for (let i = 0; i < this.fixtBadge.length; i++) {
        if(this.fixtBadge[i].id === item.homeTeam.id) 
        return this.fixtBadge[i].shortName.toUpperCase();
      }
    },
    myAwayTeam(item) {
      for (let i = 0; i < this.fixtBadge.length; i++) {
        if(this.fixtBadge[i].id === item.awayTeam.id) 
        return this.fixtBadge[i].shortName.toUpperCase();
      } 
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
      if (this.selectedTeam == 'Select team') {
        for (let i = 0; i < this.allMatches.length; i++) {
          if ( item === this.allMatches[0]) 
            return true;
          else if ( this.allMatches[i] === item && this.allMatches[i].utcDate === this.allMatches[i-1].utcDate) 
           return false;
          else if ( this.allMatches[i] === item && this.allMatches[i].utcDate !== this.allMatches[i-1].utcDate) 
            return true;
        }
      } 
      else if (this.selectedTeam != 'Select team') {
        for (let i = 0; i < this.allMatches.length; i++) {
          return true;
        }
      }
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media only screen and (orientation: portrait) {
 .venue {
    display: none;
  }
}
.fixtures {
  background-color: rgb(245, 250, 220);
}
#loader {
  background-color: white;
}
.selectMe { 
  width: 140px;
}
.timeContainer {
  display: flex;
  justify-content: center;
}
h6 {
  position: relative;
  font-stretch: extra-condensed; 
  top: 16px;
  background-color: rgb(245, 250, 220);
  padding: 0px 5px 0px 5px;
}
img {
   height: 60px;
   width: 60px;
   padding: 5px;
}
table { 
  width: 100%;
  font-size: 10px;
  font-stretch: condensed;
  background-color: rgb(245, 250, 220);
}
td {
  background-color: rgb(245, 250, 220);
  border-top: 1px solid #ccc;
  padding: 20px 0px 0px 0px
}
.teamContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 130px;
  font-size: 13px;
}
.scoreTd {
  max-width: 100px;
}
.myScore {
  font-size: 22px;
}
.sk-cube-grid {
  width: 60px;
  height: 60px;
  margin: 250px auto;
}
.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: rgb(245, 11, 11);
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s; }
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s; }
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s; }
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s; }
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s; }
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s; }
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1); 
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  } 
}
</style>