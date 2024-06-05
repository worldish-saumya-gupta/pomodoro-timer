<template>
    <div>
      <h2>Timer using vue</h2>
      <div class="timer">
        <div v-if="isWorking" class="session-type">Work Session</div>
        <div v-else class="session-type">Break</div>
        <div class="time">{{ formatTime(timeLeft) }}</div>
      </div>
      <div class="controls">
        <button @click="startTimer" v-if="!timerActive" class="start-btn">Start</button>
        <button @click="pauseTimer" v-if="timerActive" class="pause-btn">Pause</button>
        <button @click="resetTimer" class="reset-btn">Reset</button>
      </div>
      <div class="settings">
        <label for="workDuration">Work Duration (minutes):</label>
        <input type="number" id="workDuration" v-model.number="workDuration" class="duration-input">
        <label for="breakDuration">Break Duration (minutes):</label>
        <input type="number" id="breakDuration" v-model.number="breakDuration" class="duration-input">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        workDuration: 25, 
        breakDuration: 5, 
        timeLeft: 25 * 60,
        timerActive: false,
        isWorking: true,
        timer: null
      };
    },
    watch: {
      workDuration(newVal) {
        if (!this.timerActive) {
          this.timeLeft = newVal * 60;
        }
      }
    },
    methods: {
      startTimer() {
        this.timerActive = true;
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.timerActive = false;
            clearInterval(this.timer);
            this.timeLeft = this.isWorking ? this.breakDuration * 60 : this.workDuration * 60;
            this.isWorking = !this.isWorking;
            this.playNotification();
          }
        }, 1000);
      },
      pauseTimer() {
        this.timerActive = false;
        clearInterval(this.timer);
      },
      resetTimer() {
        this.pauseTimer();
        this.timeLeft = this.workDuration * 60;
        this.isWorking = true;
      },
      formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      },
      playNotification() {
        alert(this.isWorking ? 'Break ended! Time to work.' : 'Work session ended! Take a break.');
      }
    }
  };
  </script>
  
  <style scoped>
  .timer {
    font-size: 24px;
    text-align: center;
    margin-top: 50px;
  }
  
  .session-type {
    margin-bottom: 10px;
  }
  
  .time {
    font-size: 32px;
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
  </style>
  