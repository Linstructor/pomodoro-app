<template>
  <div style="width: 100%; height: 100%; overflow: hidden;">
    <!--<div id="ripple"></div>-->
    <div id="settings-button" class="far fa-cog" @click="showSettings" v-if="!this.running"></div>
    <Settings v-if="isSettingsPageShow"></Settings>
    <div id="main" style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;" @click="start">
      <p id="time">
        <input id="input" :value="getMinutes" type="number" @input="changeMinutes($event.target.value)">:<span id="secondes">{{getSeconds}}</span>
      </p>
    </div>
    <Indicators v-if="!this.running"></Indicators>
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
        'getMinutes',
        'getSeconds'
      ]),
      ...mapState('app', ['isSettingsPageShow']),
      ...mapState('timer', ['running', "minutes"])
    },
    methods: {
      ...mapActions('timer', [
        'changeMinutes',
        'changeState',
        'decount'
      ]),
      ...mapActions('app', [
        'showSettings'
      ]),
      ...mapActions('indicators', [
        'add'
      ]),
      start(event) {
        if (event.srcElement.id !== 'main') return;
        console.log('start');
        this.changeState('start');
        require('electron').ipcRenderer.send('start');
        timer.start({minutes: this.minutes}, this.updateTimer, this.handleStop);
      },
      updateTimer(info, previousValue) {
        // console.log(info, previousValue);
        this.decount(Math.round(Math.abs(new Date(info)- new Date(previousValue)) / 1000));
      },
      handleStop() {
        this.changeState('stop');
        require('electron').ipcRenderer.send('end');
        this.add();
        console.log('finish');
      },
    },
  }
</script>

<style scoped>
</style>