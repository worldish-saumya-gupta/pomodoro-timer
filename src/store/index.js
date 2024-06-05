import { createStore } from 'vuex'
export default createStore({
  state: {
    workDuration: 25,
    breakDuration: 5,
    timeLeft: 25 * 60,
    timerActive: false,
    isWorking: true,
    timer: null,
    mode : true
  },
  mutations: {
    changeMode(state){
      state.mode = !state.mode
    },
    setTimeLeft(state, time) {
      state.timeLeft = time;
    },
    setTimerActive(state, active) {
      state.timerActive = active;
    },
    setIsWorking(state, working) {
      state.isWorking = working;
    },
    setTimer(state, timer) {
      state.timer = timer;
    },

    resetTimer(state) {
      state.timeLeft = state.workDuration * 60;
      state.isWorking = true;
      state.timerActive = false;
      clearInterval(state.timer); 
      state.timer = null; 
    },

    updateWorkDuration(state, newDuration) {
      state.workDuration = newDuration;
      if (!state.timerActive) {
        state.timeLeft = newDuration * 60;
      }
    },
    updateBreakDuration(state, newDuration) {
      state.breakDuration = newDuration;
      if (!state.timerActive && !state.isWorking) {
        state.timeLeft = newDuration * 60;
      }
    }

  },
  actions: {
    startTimer({ commit ,state }) {
      commit('setTimerActive', true);
      const timer = setInterval(() => {
        if (state.timeLeft > 0) {
          commit('setTimeLeft', state.timeLeft - 1);
        } else {
          commit('setTimerActive', false);
          clearInterval(state.timer);
          commit('setTimeLeft', state.isWorking ? state.breakDuration * 60 : state.workDuration * 60);
          commit('setIsWorking', !state.isWorking);
          alert(state.isWorking ? 'Break ended! Time to work.' : 'Work session ended! Take a break.');
        }
      }, 1000);
      commit('setTimer', timer);
    },
    pauseTimer({ commit, state }) {
      commit('setTimerActive', false);
      clearInterval(state.timer);
    },
    resetTimer({ commit, state }) {
      commit('resetTimer');
    },
  },
  //getters
  // getters:{
  //   showModeChange:(

  //   )
  // }
});


//routers
//meta
//next()