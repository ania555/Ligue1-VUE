<template>
  <div class="teams">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>
      <!-- <div id="vvv"></div> -->
      <br>
      <div class="myContainer">
        <onemyteam v-if="isModalVisible" v-on:close="popClose" :modalTeam="currentTeam" :modalTeamsFr="teamsFr" :modalMaps="teamMaps"/>
        <div class="tContainer">
          <div class="oneTeam" v-for="(team, i) in teamBadge" :key="i">
            <!-- <div class="oneBackground" v-bind:style='{ backgroundImage: "url(" + team.picBadge + ")",}'> -->
            <div class="oneBackground"  v-bind:style='{ backgroundColor: team.color}'>  
              <img :src="team.picBadge" alt="">
              <div class="oneTeamName" v-bind:style='{ color: team.nameColor}'>{{ team.shortName }}</div>
              <div class="clubButton" v-on:click="popUp(team)" v-bind:style='{ color: team.teamColor}'>
                <p>Club Profile</p>
                <div class="offArrow">
                  <img id="arrow" src="images/arrow-icon.png">
                  <img id="arrow" src="images/arrow-icon.png">
                </div>
                <!-- <i class="arrow-right"></i> -->
              </div>
            </div>
          </div>
        </div><br><br><br><br><br>
      </div>
    </div>
  </div>
</template>



<script>
import Onemyteam from '@/components/Onemyteam.vue'

export default {
  name: 'teams',
  components: {
    Onemyteam,
  },
   data() {
     return {
       num: 874,
       isLoading: true,
       isModalVisible: false,
       currentTeam: null,
       teamsFr: [],
       teamBadge: [],
       teamMaps: [
        { id: 543, name: "FC Nantes", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.9834546215757!2d-1.526863584860583!3d47.256026820123374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ee49b39eb7a5%3A0x147532f48e591254!2sStade+de+la+Beaujoire!5e0!3m2!1sen!2sde!4v1544701117666"},
        { id: 548, name: "AS Monaco FC", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.179772961793!2d7.413307215008785!3d43.72759215563584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc2eca3427a9f%3A0x50a2648034c66ba1!2sLouis+II+Stadium!5e0!3m2!1sen!2sde!4v1544701002718"},
        { id: 527, name: "AS Saint-Étienne", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.44902851745!2d4.387916915071833!3d45.46075784169505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f5ac72b5162507%3A0x8082a74595924a0a!2sStade+Geoffroy-Guichard+saint+%C3%89tienne!5e0!3m2!1sen!2sde!4v1544701746244"},
        { id: 538, name: "En Avant Guingamp", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.285008706595!2d-3.1665729848098185!3d48.566089829197765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48118ccfffe526b1%3A0x1165334458be274d!2sStade+Municipal+de+Roudourou!5e0!3m2!1sen!2sde!4v1544700595900"},
        { id: 556, name: "Nîmes Olympique", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.919514383147!2d4.3570669150119326!3d43.81602884990508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b432a564cee009%3A0xb7bbd3cb3c908688!2sCostieres+Stadium!5e0!3m2!1sen!2sde!4v1544701305805"},
        { id: 523, name: "Olympique Lyonnais", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.2939606774707!2d4.97984031508311!3d45.765298721323205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c7221ed6efa5%3A0x2f897dd844dfd2c2!2sLyon+Olympic+Stadium!5e0!3m2!1sen!2sde!4v1544700789256"},
        { id: 547, name: "Stade de Reims", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.54603902688!2d4.022455315217033!3d49.24709548121329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e974521132e69d%3A0xbe6676e5183662a9!2sStade+Auguste-Delaune!5e0!3m2!1sen!2sde!4v1544701538526"},
        { id: 518, name: "Montpellier HSC", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.2503886522695!2d3.809874015005004!3d43.62214726245696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6ac3a9829522b%3A0x99e056199e3d006b!2sStade+de+la+Mosson!5e0!3m2!1sen!2sde!4v1544701059439"},
        { id: 576, name: "RC Strasbourg Alsace", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.60088327995!2d7.752934815189925!3d48.56003912962192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c90abf8b32dd%3A0xbc3d84f3bc61695!2sMeinau+stadium!5e0!3m2!1sen!2sde!4v1544702149501"},
        { id: 516, name: "Olympique de Marseille", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.1216602750196!2d5.393698615485329!3d43.269826979136305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9b8a778a71c19%3A0xf30ae56cc3f4dc1e!2sOrange+V%C3%A9lodrome!5e0!3m2!1sen!2sde!4v1544700919198"},
        { id: 514, name: "SM Caen", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.110451544873!2d-0.39889808478565303!3d49.17949068599846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a43180d385cd3%3A0xe051b6632a3a2c18!2sStade+Michel+d&#39;Ornano!5e0!3m2!1sen!2sde!4v1544700439995"},
        { id: 532, name: "Angers SCO", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.5128319838313!2d-0.5329826848527432!3d47.46043510605762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480878cf24e699d9%3A0xee44826820b9c665!2sRaymond+Kopa+Stadium!5e0!3m2!1sen!2sde!4v1544699805653"},
        { id: 511, name: "Toulouse FC", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.11595301251!2d1.4318593150036512!3d43.58330106496669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb8442a6d3ad%3A0x258ae94747bde3cd!2sStadium+TFC!5e0!3m2!1sen!2sde!4v1544702216567"},
        { id: 526, name: "FC Girondins de Bordeaux", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2826.2758064107957!2d-0.5637416849489177!3d44.89738477910627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5529085c00e041%3A0xe9a61444765a6d7e!2sMatmut+ATLANTIQUE!5e0!3m2!1sen!2sde!4v1544699924458"},
        { id: 521, name: "Lille OSC", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.8152686330072!2d3.128301215271765!3d50.6119700835951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d6467a158d69%3A0x111d6a3b1cf4201a!2sStade+Pierre+Mauroy!5e0!3m2!1sen!2sde!4v1544700668231"},
        { id: 524, name: "Paris Saint-Germain FC", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.8793958960046!2d2.25086001520097!3d48.84143910985487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67ac09948a18d%3A0xdd2450406cef2c5c!2sLe+Parc+des+Princes!5e0!3m2!1sen!2sde!4v1544701441594"},
        { id: 528, name: "Dijon Football Côte d'Or", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.4856892178746!2d5.06613981514201!3d47.32438521542455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f29e11c86ebb7b%3A0x15495953e662c177!2sStade+Gaston-G%C3%A9rard!5e0!3m2!1sen!2sde!4v1544700519017"},
        { id: 530, name: "Amiens SC", venue: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2570.2777233092265!2d2.2606575!3d49.8935891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e7838d50e9f611%3A0x9c54e781acf0c7cd!2sStade+de+la+Licorne!5e0!3m2!1sen!2sde!4v1544699598230"},
        { id: 522, name: "OGC de Nice Côte d'Azur", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2639788514466!2d7.190396315008!3d43.705062857094234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd1ef37a975c5%3A0xe5a00153b844e8d3!2sAllianz+Riviera+-+Nice+Stadium!5e0!3m2!1sen!2sde!4v1544701165253"},
        { id: 529, name: "Stade Rennais FC 1901", venue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.1224180114314!2d-1.7153058848277147!3d48.10787416120907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ee08a00d98f4b%3A0x7ac182be794ce747!2sRoazhon+Park!5e0!3m2!1sen!2sde!4v1544701679486"},
      ],
     }
  },
  mounted() {
    console.log(this.$route.params.teamsforTeams)
     if(!this.$route.params.teamsforTeams) {
       this.teamBadge = this.$parent.teamLogos
     } else {
       this.teamBadge = this.$route.params.teamsforTeams
     }
  },
  created() {
    let url = "https://api.football-data.org/v2/competitions/FL1/teams";
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
      console.log("teams");
      this.teamsFr = json.teams;
      this.isLoading = false,
      console.log(this.teamsFr);
    })
   .catch((error) => {
      console.log("Request failed: " + error.message)
    })
  },
  methods: {
    popUp(item) {
      console.log("open");
      this.currentTeam = item
      console.log(this.currentTeam)
      console.log(this.isModalVisible)
      this.isModalVisible = true;
    },
    popClose() {
      console.log("close");
      this.isModalVisible = false;
    }
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.teams {
  background-color: rgb(245, 250, 220);
}

.myContainer {
  margin: 5px 0px 5px 0px;
}
.tContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
.oneTeam {
 width: 47%;
 padding: 6px 0px 6px 0px;
}
.oneBackground {
  display: flex;
  flex-flow: column;  
}
img {
  width: 90%;
  height: auto;
  align-self: center;
  margin-top: 15px;
}
.oneTeamName {
  padding-top: 5px;
  font-weight: bold;
}
.clubButton {
  align-self: center;
  text-decoration: none;
  background: rgba(150,150,150,0.3);
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  width: 90%;
  border-radius: 5px;
  margin: 5px 0px 10px 0px;
  padding-top: 5px;
}
#arrow {
  height: 17px;
  width: auto;
  margin: 10px -12px 0px 0px;
  
}
.offArrow {
  margin: -45px 12px 0px 0px;
  position: relative;
  float: right;
  clear: right;
}
#vvv {
  background-image: url("~/images/amiens.jpg");
  height: 100px;
}
</style>