<template>
  <div id="app">
    <!-- <div v-if="isLoading">
      <p>loading</p>
    </div> -->
    <div>   
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/fixtures">Fixtures</router-link> |
      <router-link to="/table">Table</router-link> |
      <router-link to="/teams">Teams</router-link>  -->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
         <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'fixtures', params:{ teamsforSchedule: this.teamLogos}} ">Schedule</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/table">Table</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'teams', params:{ teamsForTeams: this.teamLogos}}">Teams</router-link>
        </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
   </div>
  </nav>
</div>


  <div>
    <router-view/>
  </div>
</div>




</template>


<script>

import Home from './views/Home.vue'
import Fixtures from './views/Fixtures.vue'
import Table from './views/Table.vue'
import Teams from './views/Teams.vue'

export default {
 name: 'App',
  components: {
    Home,
    Fixtures,
    Table,
    Teams,
  },
  data() {
    return {
      num: 25,
      //isLoading: true,
      teamsFr: [],
      fruit: "orange",
      teamLogos: [
        { id: 543, name: "FC Nantes", venue: "Stade de la Beaujoire - Louis Fonteneau", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/qxtuvw1473504792.png"},
        { id: 548, name: "AS Monaco FC", venue: "Stade Louis II.", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/xwxsxq1473504775.png"},
        { id: 527, name: "AS Saint-Étienne", venue: "Stade Geoffroy-Guichard", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/lqc1031518124880.png"},
        { id: 538, name: "En Avant Guingamp", venue: "Stade du Roudourou", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uxxxsv1473504732.png"},
        { id: 556, name: "Nîmes Olympique", venue: "Stade des Costières", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yvxuwy1426871421.png"},
        { id: 523, name: "Olympique Lyonnais", venue: "Groupama Stadium", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/vwtvyt1473504756.png"},
        { id: 547, name: "Stade de Reims", venue: "Stade Auguste-Delaune II", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/wqxupr1473505457.png"},
        { id: 518, name: "Montpellier HSC", venue: "Stade de la Mosson", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/spxtvu1473504783.png"},
        { id: 576, name: "RC Strasbourg Alsace", venue: "Stade de la Meinau", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yuxtyy1464540071.png"},
        { id: 516, name: "Olympique de Marseille", venue: "Orange Vélodrome", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uutsyt1473504764.png"},
        { id: 514, name: "SM Caen", venue: "Stade Michel d'Ornano", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/uwuuqu1467461847.png"},
        { id: 532, name: "Angers SCO", venue: "Stade Raymond Kopa", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/twtppr1426871974.png"},
        { id: 511, name: "Toulouse FC", venue: "Stadium Municipal", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/xtwuyr1473504835.png"},
        { id: 526, name: "FC Girondins de Bordeaux", venue:  "Stade Matmut-Atlantique", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/wtwvyx1473504715.png"},
        { id: 521, name: "Lille OSC", venue: "Stade Pierre-Mauroy", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/2giize1534005340.png"},
        { id: 524, name: "Paris Saint-Germain FC", venue: "Parc des Princes", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/rwqrrq1473504808.png"},
        { id: 528, name: "Dijon Football Côte d'Or", venue: "Stade Gaston Gérard", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/tustuw1473504724.png"},
        { id: 530, name: "Amiens SC", venue: "Stade de la Licorne", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/yvxwwq1471876116.png"},
        { id: 522, name: "OGC de Nice Côte d'Azur", venue: "Stade de Nice", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/qwvtvt1473504800.png"},
        { id: 529, name: "Stade Rennais FC 1901", venue: "Roazhon Park", crestUrl: "https://www.thesportsdb.com/images/media/team/badge/small/ypturx1473504818.png"},
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
</style>
