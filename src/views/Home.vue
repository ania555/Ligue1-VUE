<template>
  <div class="home">
    <div id="homeContainer">
      <br><br><br>
      <img src="images/ball.png" alt="">
      <br><br><br><br><br><br><br>
    </div>
    
    <div>
      <iframe src="https://taghcountdown.909c.fr/small-en.html"></iframe>
    </div>  
    <br>
    <!-- <div class="scrollMe">
      <table>
      <thead>
      <tr>
        <th></th>
        <th class="fixHead2">head</th>
        <th class="fixHead3">head</th>
        <th class="FixHead4">head</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>head</th>
        <td class="fixColumn2" >bodytfdtdtfdfd</td>
        <td class="fixColumn3">bodyzfdd</td>
        <td class="fixColumn4">bodyfxfx</td>
      </tr>

      </tbody>
      </table>
    </div> -->
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, 
  },
  data() {
    return {
    }
  },
}
</script>


<style scoped>

.home {
  background-color: rgb(245, 250, 220);
}
#homeContainer {
  /* background-image: url("~@/assets/french-flag.png"); */
  background-image: url("~@/assets/france-fabrik.png");
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100%;
  height: 100%;
}
img {
  height: 140px;
  width: auto;
  position: relative;
  margin-bottom: 5px;
}
iframe {
  border:none;
  margin-left: 10px;
  background-color: rgb(170,170,170);
  width: 300px;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
}
.scrollMe {
  max-width: 100%;
  max-height: 500px;
  overflow: scroll;
  position: relative;
}
table {
  position: relative;
  border-collapse: collapse;
}
td, th {
  padding: 5px;
  width: 50px;
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
}
.fixHead2 {
  left: 47px;
  z-index: 1;
}
.fixColumn2 {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 47px;
  background: #FFF;
  border-right: 1px solid #CCC;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #FFF;
  border-right: 1px solid #CCC;
}

</style>
