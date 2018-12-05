<template>
  <div class="table">
    <h1>This is an about page</h1>
  </div>
</template>



<script>
export default {
    name: 'table',
  components: {
    
  },
   data() {
    return {
      num: 49,
      standingsFr: [],
      fruit: "apple",

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
                    console.log(this.standingsFr);
                })
                .catch((error) => {
                    console.log("Request failed: " + error.message)
                })
  }
}
</script>
