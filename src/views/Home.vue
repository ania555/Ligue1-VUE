<template>
  <div class="home">
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
  }
}
</script>



<style scoped>

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
