<template>
  <div class="Onemyteam">
    <div id="myModal" class="myBookModal">
      <div class="myModal-content">
        <span class="close" v-on:click="$emit('close')">&times;</span>
        <img id="crest" :src="modalTeam.crestUrl" alt="">
        <p>{{ modalTeam.name }}</p>
        <br><br><br>
        <a id="official" :href="myTeam(modalTeam)">Oficial Website <i class="arrow-right"></i></a>
        <input type="button" value="aaaaaaa" v-on:click="myTeam(modalTeam)">
         
      </div>
    </div>
  </div>
</template>


<script>
//var moment = require('moment');
//import moment from 'moment'

export default {
  name: 'onemyteam',
  props: ["modalTeam", "modalTeamsFr"],
  components: {
  },
  data() {
    return {
      num: 51,
      fruit: "apple",
    }
  },
  methods: {
    myTeam(item) {
      for (let i = 0; i < this.modalTeamsFr.length; i++) {
        if(this.modalTeamsFr[i].id === item.id) {
        console.log(this.modalTeamsFr[i].website);
        return this.modalTeamsFr[i].website;
        }
      }
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Onemyteam {
  background-color: rgb(245, 250, 220);
}
#official {
  background-color: aqua;
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
}
i {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
}
.arrow-right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
#crest {
  height: 100px;
  width: auto;
  float: left;
}
.teamWrap {
  display: flex;
  flex-wrap: nowrap;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  font-size: 24px;
  font-weight: bold;
}

.myBookModal {
  position: fixed;  /*Stay in place */
  z-index: 1;  /*Sit on top */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;                 
  /*  background-color: red; Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}
/* Modal Content/Box */
.myModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:rgb(120, 120, 120);
  color:white;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 0px;
  box-shadow: 2px 2px 20px 1px;
  height: 95%;
  width: 97%; /* Could be more or less, depending on screen size */
}
/* The Close Button */
.close {
  color: #aaa;
  align-self: flex-end;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>