<template>
  <div style="width: 100%; height: 100%">
    <div id="settings-button" class="far fa-cog" @click="showSettings"></div>
    <Settings v-if="isSettingsPageShow"></Settings>
    <div id="main" style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;" @click="start">
      <p id="time">
        <input id="input" :value="minutes" type="number" @input="changeMinutes($event.target.value)">:<span id="secondes">{{seconds}}</span>
      </p>
    </div>
    <Indicators></Indicators>
    <Actions v-if="this.running" :callback="updateTimer" :stop-callback="handleStop"></Actions>
  </div>
</template>

<script>
  import Indicators from './main/Indicators'
  import Settings from "./Settings";
  import {mapActions, mapGetters, mapState} from 'vuex';
  import Actions from "./Actions";
  import timer from '../timer'

  export default {
    name: "App",
    components: {Actions, Settings, Indicators},
    computed: {
      ...mapGetters('timer', [
        'minutes',
        'seconds'
      ]),
      ...mapState('app', ['isSettingsPageShow']),
      ...mapState('timer', ['running'])
    },
    methods: {
      ...mapActions('timer', [
        'changeMinutes',
        'changeState'
      ]),
      ...mapActions('app', [
        'showSettings'
      ]),
      start(event) {
        if (event.srcElement.id !== 'main') return;
        console.log('start');
        this.changeState('start');
        timer.start({minutes: this.minutes}, this.updateTimer, this.handleStop);
      },
      updateTimer(info) {
        console.log(info);
      },
      handleStop() {
        console.log('finish');
      },
    },
  }
</script>

<style scoped>
</style>