<template>
  <div class="standings">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>
      <div>
        <p>{{ picked }}</p>
      </div>
      <div>
        <form class="chooseSandings">
          <span>
            <input type="radio" v-model="picked" id="gSt" value="generalSt">
            <label :class="pickButton('generalSt')" for="gSt">GENERAL</label>
          </span>
          <span>
            <input type="radio" v-model="picked" id="hSt" value="homeSt">
           <label :class="pickButton('homeSt')" for="hSt">HOME</label>
          </span>
          <span>
            <input type="radio" v-model="picked" id="aSt" value="awaySt">
            <label :class="pickButton('awaySt')" for="aSt">AWAY</label>
          </span>      
        </form>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th><span></span></th>
              <th><span></span></th>
              <th>TEAM</th>
              <th>PLAYED</th>
              <th>WINS</th>
              <th>DRAWS</th>
              <th>LOSES</th>
              <th>FOR</th>
              <th>AGAINST</th>
              <th></th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody v-for="standing in pickedStanding">
            <tr>
              <td :class="colorPos(standing.position)">{{ standing.position }}</td>
              <td><span></span></td>
              <td><img :src="myBadge(standing)" alt=""></td>
              <td>{{ standing.team.name }}</td>
              <td>{{ standing.playedGames }}</td>
              <td>{{ standing.won }}</td>
              <td>{{ standing.draw }}</td>
              <td>{{ standing.lost }}</td>
              <td>{{ standing.goalsFor }}</td>
              <td>{{ standing.goalsAgainst }}</td>
              <td>{{ standing.goalDifference }}</td>
              <td>{{ standing.points }}</td>
            </tr>
          </tbody>
        </table>
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
      picked: "generalSt",
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
      if (this.picked == "generalSt") {
        return this.standingsFr[0].table
      }
      else if (this.picked == "homeSt") {
         return this.standingsFr[1].table
      }
      else if (this.picked == "awaySt") {
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

img {
   height: 35px;
}
.up {
    border: 6px transparent solid;
    content: "";
    width: 0;
    height: 0;
    border-bottom-color: #009000;
    display: inline-block;
    margin-bottom: 4px;
}
.down {
    border: 6px transparent solid;
    content: "";
    width: 0;
    height: 0;
    border-top-color: #C80A00;
    display: inline-block;
    margin-bottom: -2px;
}
.stable {
    border: 6px transparent solid;
    content: "";
    width: 0;
    height: 0;
    border-left-color: rgb(49, 20, 177);
    display: inline-block;
    margin-bottom: 0px;
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

/* .chooseSandings span {
    width: 100px;
    height: 40px; 
    background-color: blue;
    color: white;
    margin-left: 20px;
}
.chooseSandings input [type="radio"] {
    opacity: 0.01;
    z-index: 100;
} */




.chooseSandings {
  margin:25px 0 0 0;
  padding:0;
}

.chooseSandings span {
  float: right;  
  margin: 0 30px 0 0;
  width: 100px;
  height: 40px;
  position: relative;


}

.chooseSandings label, .chooseSandings input {
  display: block;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
}

.chooseSandings input [type="radio"] {
  opacity: 0.01;
  z-index: 100;
}

/* .chooseSandings input [type="radio"]:checked + label {
  background: rgb(134, 134, 250);
} */

.chooseSandings label {
  padding: 5px;
  border: 1px solid #CCC;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  z-index: 90;
}

.chooseSandings label:hover {
  background: rgb(120, 120, 180);
}
.pickedButton {
  background: rgb(120, 120, 180);
}
.freeButton {
  background: rgb(13, 13, 71);
}
</style>