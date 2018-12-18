<template>
  <div id="app">
    <!-- <div v-if="isLoading">
      <p>loading</p>
    </div> -->
    <div>
      <b-navbar toggleable="md" type="dark" variant="secondary">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <img src="" alt="">
        
        <b-navbar-brand href="#">LIGUE 1</b-navbar-brand>
        <img src="./assets/logo_ligue1.jpeg" alt="">
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <router-link class="nav-link" to="/">Home</router-link>
              <router-link class="nav-link" :to="{ name: 'fixtures', params:{ teamsforSchedule: this.teamLogos}} ">Schedule</router-link>
              <router-link class="nav-link" :to="{ name: 'standings', params:{ teamsForStandings: this.teamLogos}}">Standings</router-link>
              <router-link class="nav-link" :to="{ name: 'teams', params:{ teamsForTeams: this.teamLogos}}">Teams</router-link>
              <router-link class="nav-link" :to="{ name: 'chat'}">Chat</router-link>
              <b-nav-item href="#">Link</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
      </b-navbar>
    </div>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/fixtures">Fixtures</router-link> |
      <router-link to="/standings">Standings</router-link> |
      <router-link to="/teams">Teams</router-link>  -->
     
  <div>
    <router-view/>
  </div>
</div>

</template>




<script>

import Home from './views/Home.vue'
import Fixtures from './views/Fixtures.vue'
import Standings from './views/Standings.vue'
import Teams from './views/Teams.vue'
import Chat from './views/Chat.vue'

export default {
 name: 'App',
  components: {
    Home,
    Fixtures,
    Standings,
    Teams,
    Chat,
  },
  data() {
    return {
      num: 25,
      //isLoading: true,
      teamsFr: [],
      fruit: "orange",
      teamLogos: [
        { id: 530, picAbstr: "images/amien-screen.png", teamColor: "rgb(20,20,20)", nameColor: "rgb(20,20,20)", color: "rgb(102,102,102)", picBadge: "images/amiens.jpg", shortName: "Amiens SC", name: "Amiens SC", venue: "Stade de la Licorne", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yvxwwq1471876116.png"},
        { id: 532, picAbstr: "images/angers-screen.png", teamColor: "rgb(30,30,30)", nameColor: "rgb(30,30,30)", color: "rgb(212,212,212)", picBadge: "images/angers.jpg", shortName: "Angers SCO", name: "Angers SCO", venue: "Stade Raymond Kopa", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/twtppr1426871974.png"},
        { id: 526, picAbstr: "images/bordeaux-screen.png", teamColor: "rgb(30,30,30)", nameColor: "rgb(30,30,30)", color: "rgb(212,212,212)", picBadge: "images/bordeaux.jpg", shortName: "Bordeaux", name: "FC Girondins de Bordeaux", venue:  "Stade Matmut-Atlantique", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/wtwvyx1473504715.png"},
        { id: 514, picAbstr: "images/caen-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(0,27,71)", picBadge: "images/caen.jpg", shortName: "SM Caen", name: "SM Caen", venue: "Stade Michel d'Ornano", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uwuuqu1467461847.png"},
        { id: 528, picAbstr: "images/dijon-abstraction.jpg", teamColor: "rgb(30,30,30)", nameColor: "rgb(30,30,30)", color: "rgb(202,202,202)", picBadge: "images/dijon.jpg", shortName: "Dijon FCO", name: "Dijon Football Côte d'Or", venue: "Stade Gaston Gérard", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/tustuw1473504724.png"},
        { id: 538, picAbstr: "images/guingamp-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(20,20,20)", picBadge: "images/guingamp.jpg", shortName: "EA Guingamp", name: "En Avant Guingamp", venue: "Stade du Roudourou", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uxxxsv1473504732.png"},
        { id: 521, picAbstr: "images/lille-screen1.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(0,27,71)", picBadge: "images/lille.jpg", shortName: "Lille OSC", name: "Lille OSC", venue: "Stade Pierre-Mauroy", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/2giize1534005340.png"},
        { id: 523, picAbstr: "images/lyon-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(16,48,94)", picBadge: "images/lyon.jpg", shortName: "Olympique Lyon", name: "Olympique Lyonnais", venue: "Groupama Stadium", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/vwtvyt1473504756.png"},
        { id: 516, picAbstr: "images/marseille-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(0,117,165)", picBadge: "images/marseille.jpg", shortName: "Marseille", name: "Olympique de Marseille", venue: "Orange Vélodrome", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uutsyt1473504764.png"},
        { id: 548, picAbstr: "images/monaco-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(255,31,31)", picBadge: "images/monaco.jpg", shortName: "AS Monaco", name: "AS Monaco FC", venue: "Stade Louis II.", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/xwxsxq1473504775.png"},
        { id: 518, picAbstr: "images/montpellier-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(245,93,10)", picBadge: "images/montpellier.jpg", shortName: "Montpellier", name: "Montpellier HSC", venue: "Stade de la Mosson", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/spxtvu1473504783.png"},
        { id: 543, picAbstr: "images/nantes-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(24,83,48)", picBadge: "images/nantes.jpg", shortName: "FC Nantes", name: "FC Nantes", venue: "Stade de la Beaujoire", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/qxtuvw1473504792.png"},
        { id: 522, picAbstr: "images/nice-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(20,20,20)", picBadge: "images/nice.jpg", shortName: "OGC Nice", name: "OGC de Nice Côte d'Azur", venue: "Stade de Nice", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/qwvtvt1473504800.png"},
        { id: 556, picAbstr: "images/bordeaux-abstraction.jpg", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(170,0,19)", picBadge: "images/nîmes.jpg", shortName: "Nîmes Ol.", name: "Nîmes Olympique", venue: "Stade des Costières", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yvxuwy1426871421.png"},
        { id: 524, picAbstr: "images/paris-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(0,57,121)", picBadge: "images/paris.jpg", shortName: "PSG", name: "Paris Saint-Germain FC", venue: "Parc des Princes", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/rwqrrq1473504808.png"},
        { id: 547, picAbstr: "images/reims-screen.png", teamColor: "rgb(30,30,30)", nameColor: "rgb(30,30,30)", color: "rgb(232,232,232)", picBadge: "images/reims.jpg", shortName: "Stade de Reims", name: "Stade de Reims", venue: "Stade Auguste-Delaune II", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/wqxupr1473505457.png"},
        { id: 529, picAbstr: "images/rennais-screen.png", teamColor: "rgb(30,30,30)", nameColor: "rgb(30,30,30)", color: "rgb(255,203,0)", picBadge: "images/stade-rennais.jpg", shortName: "Stade Rennes", name: "Stade Rennais FC 1901", venue: "Roazhon Park", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/ypturx1473504818.png"},
        { id: 527, picAbstr: "images/asse-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(24,83,48)", picBadge: "images/asse.jpg", shortName: "Saint-Étienne", name: "AS Saint-Étienne", venue: "Stade Geoffroy-Guichard", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/lqc1031518124880.png"},
        { id: 576, picAbstr: "images/strasbourg-abstraction.jpg", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(117,151,255)", picBadge: "images/strasbourg.jpg", shortName: "RC Strasbourg", name: "RC Strasbourg Alsace", venue: "Stade de la Meinau", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yuxtyy1464540071.png"},
        { id: 511, picAbstr: "images/toulouse-screen.png", teamColor: "rgb(230,230,230)", nameColor: "rgb(230,230,230)", color: "rgb(225,39,0)", picBadge: "images/toulouse.jpg", shortName: "Toulouse FC", name: "Toulouse FC", venue: "Stadium Municipal", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/xtwuyr1473504835.png"},
      ],

    }
  },
}

</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
img {
  height: 70px;
  
}
</style>
