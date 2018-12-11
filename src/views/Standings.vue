<template>
  <div class="standings">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>
       <div>
        <b-form-select v-model="picked">
           <option>GENERAL</option>
           <option>HOME</option>
            <option>AWAY</option>
        </b-form-select>  
      </div>
    <div class="standingsContainer"> 
      <div>
      <div class="scrollMe">   
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="fixHead2"></th>
              <th class="fixHead3">TEAM</th>
              <th class="fixHead4">PTS</th>
              <th>PLD</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>F</th>
              <th>A</th>
              <th>GD</th>
            </tr>
          </thead>
          <tbody v-for="(standing, i) in pickedStanding" :key="i">
            <tr>
              <th :class="colorPos(standing.position)">{{ standing.position }}</th>
              <td class="fixColumn2"><img :src="myBadge(standing)" alt=""></td>
              <td class="fixColumn3">{{ standing.team.name }}</td>
              <td class="fixColumn4"><strong>{{ standing.points }}</strong></td>
              <td class="slimTd">{{ standing.playedGames }}</td>
              <td class="slimTd">{{ standing.won }}</td>
              <td class="slimTd">{{ standing.draw }}</td>
              <td class="slimTd">{{ standing.lost }}</td>
              <td class="slimTd">{{ standing.goalsFor }}</td>
              <td class="slimTd">{{ standing.goalsAgainst }}</td>
              <td class="slimTd">{{ standing.goalDifference }}</td>  
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div> 
    </div>
  </div>
</template>



<script>
export default {
    name: 'standings',
  components: {
    
  },
   data() {
    return {
      num: 49,
      isLoading: true,
      standingsFr: [],
      fruit: "apple",
      standBadge: [],
      picked: "GENERAL",
      selected: null,
    }
  },
   mounted() {
    console.log(this.$route.params.teamsForStandings)
     if(!this.$route.params.teamsForStandings) {
       this.standBadge = this.$parent.teamLogos
     } else {
       this.standBadge = this.$route.params.teamsForStandings
     }
  },
  created() {
    let url = "https://api.football-data.org/v2/competitions/FL1/standings";
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
           console.log("standings");
           this.standingsFr = json.standings;
           this.isLoading = false;
           console.log(this.standingsFr);
       })
       .catch((error) => {
           console.log("Request failed: " + error.message)
        })
  },
  computed: {
    pickedStanding() {
      console.log(this.picked);
      if (this.picked == "GENERAL") {
        return this.standingsFr[0].table
      }
      else if (this.picked == "HOME") {
         return this.standingsFr[1].table
      }
      else if (this.picked == "AWAY") {
         return this.standingsFr[2].table
      }
    }
  },
  methods: {
    myBadge(item) {
      for (let i = 0; i < this.standBadge.length; i++) {
        if(this.standBadge[i].id === item.team.id) 
        return this.standBadge[i].crestUrl;
      } 
    },
    colorPos(item) {
      let aaa = "boxGreen";
      let bbb = "boxBlue";
      let ccc = "boxOrange";
      let ddd = "boxRed";
      if (item < 5) {return aaa}
      else if (item >= 5 && item < 18) {return bbb}
      else if (item == 18) {return ccc}
      else if (item > 18) {return ddd}
    },
    pickButton(item) {
      if (this.picked == item) {
        return "pickedButton"
      }
      else if (this.picked != item) {
        return "freeButton"
      }
    }
  } 
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.standings {
  background-color: rgb(245, 250, 220);
}

select {
  height: 35px;
  width: 120px;
  border-radius: 10px;
  font-stretch: extra-condensed;
  padding-left: 15px;
  margin: 10px 0px 10px 0px;
}
.standingsContainer {
  margin: 0px 3px 0px 3px;
}

img {
   height: 40px;
   padding-left: 5px;
   padding-right: 5px;
}

.boxGreen {
  background-color: rgb(5, 185, 5);
  color: white;
}
.boxBlue {
  background-color: rgb(45, 45, 163);
  color: white;
}
.boxOrange {
  background-color: rgb(250, 117, 8);
  color: white;
}
.boxRed {
  background-color: rgb(251, 7, 7);
  color: white;
}


.scrollMe {
  max-width: 100%;
  max-height: 700px;
  overflow: scroll;
  position: relative;
}
table {
  position: relative; 
  font-size: 14px;
  background-color: rgb(245, 250, 220);
}

td, th {
  border-top: 1px solid #ccc;
  padding: 5px;
  width: 300px;
}
td {
  height: 40px;
  background-color: rgb(245, 250, 220);
}
.slimTd {
  padding-left: 10px;
  padding-right: 10px;
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
  width: 40px;
}
.fixHead2 {
  left: 30px;
  z-index: 1;
  width: 100px;
}
.fixColumn2 {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 30px;
  background-color: rgb(245, 250, 220);
  width: 100px;
}
.fixHead3 {
  left: 90px;
  z-index: 1;
  padding-left: 60px;
  padding-right: 60px;
  width: 700px;
}
.fixColumn3 {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 90px;
  background: #FFF;
  border-right: 1px solid #CCC;
  padding-left: 1px;
  padding-right: 5px;
  width: 700px;
  background-color: rgb(245, 250, 220);
}
.fixHead4 {
  left: 249px;
  z-index: 1;
  width: 50px;
}
.fixColumn4 {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 249px;
  background: #FFF;
  border-left: 1px solid #CCC;
  background-color: rgb(245, 250, 220);
  padding-left: 5px;
  padding-right: 5px;
  width: 50px;
}
tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #FFF;
  width: 40px;
  height: 40px;
  padding-left: 6.5px;
  padding-right: 6.5px;
}
</style>