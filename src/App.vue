<template>
  <div :class="{ 'light': mode, 'dark': !mode }" class="full-height">
    <button @click="changeMode" class="mode-btn">Change Mode</button>
    <!-- <Pomodoro/> -->
    <Timer/>
 </div>
</template>


<script>
import { mapMutations, mapState } from 'vuex';
import Pomodoro from './components/Pomodoro.vue';
import Timer from './components/Timer.vue';
export default {
  name: 'App',
  components: {
    Pomodoro,Timer
  },
  computed: {
    ...mapState(['mode']) 
  },
  methods: {
    //methode(0
    //changemode(){
      // CHANGE_MODE
      // ...mapMutations(['changeMode']), 

    // }
    ...mapMutations(['changeMode']), 
  }
  // getters 
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    
}

.light{
    background: white;
    color:#2c3e50;
  }
.dark{
    background: #2c3e50;
    color: white;
  }

.mode-btn{
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  background: rgb(234, 231, 231);
}
  
</style>
