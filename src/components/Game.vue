<template>
  <!-- <div class="game">
    <div class="aMatch">
      <div class="aTime">
        <p>{{ this.dayTime(allMatches[0].utcDate) }}</p>
      </div>
      <div class="aTeam">
        <img :src="gameBadges[2].crestUrl" alt="">
        <p>{{ allMatches[0].homeTeam.name }}</p>
      </div>
      <div>
        <p>2:3</p>
      </div>
      <div class="aTeam">
        <img :src="gameBadges[5].crestUrl" alt="">
        <p>{{ allMatches[0].awayTeam.name }}</p>
      </div>
    </div>


    <h1>This is a game</h1>
    
    <p>{{ allMatches[0].utcDate }}</p>
     <p>{{ this.dayDate(allMatches[0].utcDate) }} </p>
     <p>{{ this.dayTime(allMatches[0].utcDate) }}</p>
    <p>{{ allMatches[0].homeTeam.name }}</p>
    
    <p>{{ allMatches[0].awayTeam.name }}</p>
    <p>{{ allMatches[0] }}</p>
  </div> -->
</template>


<script>
//var moment = require('moment');
//import moment from 'moment'

export default {
  name: 'game',
  // props:["allMatches", "gameBadges", "myfruit"],
  components: {
  },
  data() {
    return {
      num: 51,
      fruit: "apple",
    }
  },
  // methods: {
  //   dayDate(date) {
  //     let myDay = moment(date).format("dddd D MMMM YYYY");
  //     return myDay;
  //   },
  //   dayTime(date) {
  //     let myTime = moment(date).format("HH:mm");
  //     return myTime; 
  //   }
  // }

}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
   height: 70px;
}
</style>