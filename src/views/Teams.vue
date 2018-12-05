<template>
  <div class="teams">
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-else>

    <p>{{ teamsFr[0] }}</p>
    <p>{{ teamsFr[0].crestUrl }}</p>
    <div v-for=" team in teamBadge">
      <p> {{ team.name }}</p>
      <img :src="team.crestUrl" alt="">
    </div>
    </div>
    
    <h1>This is an about page</h1>
  </div>
</template>



<script>
export default {
    name: 'teams',
  components: {
  },
   data() {
     return {
       num: 874,
       teamsFr: [],
       teamBadge: [],
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
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
   height: 70px;
}
</style>