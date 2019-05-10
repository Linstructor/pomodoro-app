<template>
  <div id="settings">
    <div :class="[darkMode ? 'dark-mode':'']" id="settings-content">
      <div id="stg-close" class="material-icons" @click="hideSettings">close</div>
      <div class="settings-el"><p class="setting-title">Pomodoro duration:</p><input id="stg-duration" type="number" v-bind:value="duration" v-on:input="setDuration($event.target.value)" v-on:change="changeMinutes($event.target.value)"></div>
      <div class="settings-el"><p class="setting-title">Always on top:</p><input class="setting-input" id="stg-ontop" type="checkbox" :checked="alwaysOnTop" @input="setAlwaysOntop(!alwaysOnTop)"></div>
      <div class="settings-el"><p class="setting-title">Auto Dark Mode:</p><input class="setting-input" type="checkbox" :checked="autoDarkMode" @input="changeAutoDarkModeState(!autoDarkMode)"></div>
      <div class="settings-el"><p class="setting-title">Dark Mode:</p><input class="setting-input" id="stg-dark" type="checkbox" :checked="darkMode" @input="changeDarkModeState(!darkMode)"></div>
    </div>
    <div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" @click="hideSettings"></div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "settings",
    computed: mapState('settings', [
      'alwaysOnTop',
      'duration',
      'darkMode',
      'autoDarkMode'
    ]),
    methods: {
      ...mapActions('settings', [
        'setDuration',
        'setAlwaysOntop',
        'changeDarkModeState',
        'changeAutoDarkModeState'
      ]),
      ...mapActions('timer', [
        'changeMinutes'
      ]),
      ...mapActions('app', [
        'hideSettings'
      ]),
    },
  }
</script>

<style scoped>

</style>