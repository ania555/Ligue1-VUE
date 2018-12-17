<template>
  <div class="home">

    <p>A Collapsible:</p>
    <button class="collapsible" v-on:click="ppp()">Open Collapsible</button>
    <div class="content">
      <p>Lorem ipsum dolor ation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>



    <div class="scrollMe">
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
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {

    }
  },
  methods: {
    ppp() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }  
    },
  }
}
</script>



<style scoped>

.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.collapsible:after {
  content: '\002B';
  color: white;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
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
