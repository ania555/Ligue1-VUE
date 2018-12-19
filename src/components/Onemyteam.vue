<template>
  <div class="Onemyteam">
    <div id="myModal" class="myBookModal">
      <div class="myModal-content" v-bind:style='{ backgroundColor: modalTeam.color }'>
        <span class="close" v-on:click="$emit('close')">&times;</span>
        <b-row class="modalRow">
          <b-col sm="5">
            <img id="crest" :src="modalTeam.picAbstr">
            <div class="buttonWrap">
              <div id="official" v-bind:style='{ backgroundColor: modalTeam.modalColor}' >
                <a :href="myTeam(modalTeam)"><p id="webOf">Official Website</p></a> 
                <div class="offArrow">
                  <img id="arrow" src="images/arrow-icon.png">
                  <img id="arrow" src="images/arrow-icon.png">
                </div>
              </div>
            </div>
            </b-col>
            <b-col sm="7">
            <div class="buttonWrap">
              <div id="venue" v-bind:style='{ backgroundColor: modalTeam.modalColor}' v-b-toggle="'collapseMap'"> 
                <span id="myVenue" >
                  <img id="arena" src="images/arena.png">
                  <p id="place">{{ modalTeam.venue }}</p>
                </span>
                <div class="downArrow">
                  <img id="arrow" src="images/arrow-icon.png">
                  <img id="arrow" src="images/arrow-icon.png">
                </div>
              </div>
              <b-collapse id="collapseMap">
                <iframe :src="myMap(modalTeam)"></iframe>
              </b-collapse>
              <div id="contact" v-bind:style='{ backgroundColor: modalTeam.modalColor}' v-b-toggle="'collapseContact'">
                <p>Contact</p>
                <div class="contactArrow">
                  <img id="arrow" src="images/arrow-icon.png">
                  <img id="arrow" src="images/arrow-icon.png">
                </div>
              </div>
              <b-collapse id="collapseContact">
                <div id="contData">
                  <p>Email: <a href="">{{ email(modalTeam) }}</a></p>
                  <p>Phone: {{ phone(modalTeam) }}</p>
                  <p>Address: {{ address(modalTeam) }}</p>
                </div>
              </b-collapse>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-container class="bv-example-row">
    <b-row>
        <b-col sm="8">col-sm-8</b-col>
        <b-col sm="4">col-sm-4</b-col>
    </b-row>
    <b-row>
        <b-col sm>col-sm</b-col>
        <b-col sm>col-sm</b-col>
        <b-col sm>col-sm</b-col>
    </b-row>
</b-container>  


  </div>
</template>


<script>
//var moment = require('moment');
//import moment from 'moment'

export default {
  name: 'onemyteam',
  props: ["modalTeam", "modalTeamsFr", "modalMaps"],
  components: {

  },
  data() {
    return {
      isOn: false,
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
    },
    myMap(item) {
      for (let i = 0; i < this.modalMaps.length; i++) {
        if(this.modalMaps[i].id === item.id) {
        console.log(this.modalMaps[i].venue);
        return this.modalMaps[i].venue;
        }
      }
    },
    email(item) {
      for (let i = 0; i < this.modalTeamsFr.length; i++) {
        if(this.modalTeamsFr[i].id === item.id) {
        console.log(this.modalTeamsFr[i].email);
        return this.modalTeamsFr[i].email;
        }
      }
    },
    phone(item) {
      for (let i = 0; i < this.modalTeamsFr.length; i++) {
        if(this.modalTeamsFr[i].id === item.id) {
        console.log(this.modalTeamsFr[i].phone);
        return this.modalTeamsFr[i].phone;
        }
      }
    },
    address(item) {
      for (let i = 0; i < this.modalTeamsFr.length; i++) {
        if(this.modalTeamsFr[i].id === item.id) {
        console.log(this.modalTeamsFr[i].address);
        return this.modalTeamsFr[i].address;
        }
      }
    },
    collapsMap() {
      this.isOn = !(this.isOn);
      console.log(this.isOn);
      return this.isOn;
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Onemyteam {
  background-color: rgb(245, 250, 220);
}
.modalRow {
  width: 100%;
}
iframe {
  width: 100%;
  height: auto;
  border-width: 20px 10px 20px 10px;
  border-color: rgb(30,30,30);
  border-style: solid;
  border-radius: 5px;
  margin-top: 3px;
  margin-bottom: -10px;
}
.buttonWrap {
  padding: 0px 15px 0px 15px;
}
#official {
  /* background-color: rgb(210,210,210); */
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  margin-top: 20px;
}
  #webOf {
  color: black;
  text-decoration: none;
  font-size: 16px;
}
#arrow {
  height: 20px;
  width: auto;
  margin: 10px -12px 0px 0px;
}
.offArrow {
  margin: -50px 5px 0px 0px;
  position: relative;
  float: right;
  clear: right;
}
#myVenue {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
#contact {
  /* background-color: rgb(210,210,210); */
  color: black;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  margin-top: 8px;
}
#contData {
  padding: 20px 20px 10px 20px;
  background-color: rgb(40,40,40);
  border-radius: 5px;
  color: white;
  margin: 5px 5px 10px 5px;
}
.downArrow {
  margin: -50px 5px 0px 0px;
  position: relative;
  float: right;
  clear: right;
  -webkit-transform: rotate(90deg);
}
.contactArrow {
  margin: -50px -5px 0px 0px;
  position: relative;
  float: right;
  clear: right;
  -webkit-transform: rotate(90deg);
}
#crest {
  width: 100%;
  height: auto;
}
#venue {
  /* background-color: rgb(210,210,210); */
  color: black;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 8px;  
}
#place {
  text-decoration: none;
  font-size: 16px;
  padding: 10px 0px 0px 0px;
}
#arena {
  height: 40px;
  width: auto;
  padding: 0px 10px 0px 0px;
}
.teamWrap {
  width: 94%;
  margin-top: -10px;
  display: flex;
  align-items: center;
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
.myModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:rgb(120, 120, 120); 
  color:black;
  margin: 2% auto; /* 15% from the top and centered */
  padding: 0px;
  box-shadow: 2px 2px 20px 1px;
  height: 100%;
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