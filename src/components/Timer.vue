<template>
  <div class="timer-app">
    <h2>Timer using vue and Vuex</h2>
    <div class="timer">
      <h2 v-if="isWorking">Work Session</h2>
      <h2 v-else>Break</h2>
      <h3>{{ formatTime(timeLeft) }}</h3>
    </div>
    <div class="controls">
      <button @click="startTimer" v-if="!timerActive" class="start-btn">Start</button>
      <button @click="pauseTimer" v-if="timerActive" class="pause-btn">Pause</button>
      <button @click="resetTimer" class="reset-btn">Reset</button>
    </div>
    <div class="settings">
      <label for="workDuration">Work Duration (minutes):</label>
      <input type="number" v-model.number="workDurationInput"   @change="updateWorkDurationInput"  class="duration-input">
      <label for="breakDuration">Break Duration (minutes):</label>
      <input type="number" v-model.number="breakDurationInput" @change="updateBreakDurationInput" class="duration-input">
    </div>
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['workDuration', 'breakDuration', 'timeLeft', 'timerActive', 'isWorking']),
  },
  data() {
    return {
      workDurationInput: 25, 
      breakDurationInput: 5,
    };
  },
  
  methods: {
    ...mapActions(['startTimer', 'pauseTimer', 'resetTimer']),
    ...mapMutations(['updateWorkDuration', 'updateBreakDuration']),

    formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    updateWorkDurationInput() {
      this.updateWorkDuration(this.workDurationInput);
    },

    updateBreakDurationInput() {
      this.updateBreakDuration(this.breakDurationInput);
    },
    changeMode(){
      this.mode = !this.mode
    }
  },

  watch: {
  timeLeft(newTimeLeft) {
    console.log('New time left:', newTimeLeft);
    if ( newTimeLeft < 20 && newTimeLeft >18) {
      alert("You have about 20 minutes left. Prepare for your break!");
    }else if (newTimeLeft < 20 && newTimeLeft >18 && !this.isWorking) {
        alert("You have 20 minutes left for your break. Prepare for your next work session!");
      }
  }
},


};
</script>



  
  <style>
  .timer {
    font-size: 24px;
    text-align: center;
    margin-top: 50px;
  }
  
  .controls {
    text-align: center;
    margin-top: 20px;
  }
  
  .start-btn,
  .pause-btn,
  .reset-btn {
    padding: 10px 20px;
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
  }
  
  .start-btn {
    background-color: #4caf50;
    color: white;
    border: none;
  }
  
  .pause-btn {
    background-color: #f44336;
    color: white;
    border: none;
  }
  
  .reset-btn {
    background-color: #008CBA;
    color: white;
    border: none;
  }
  
  .settings {
    margin-top: 20px;
  }
  
  .duration-input {
    padding: 5px 10px;
    font-size: 16px;
    margin-right: 10px;
  }

  .timer-app{
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    height: 100vh;
  }

  
  </style>
  
