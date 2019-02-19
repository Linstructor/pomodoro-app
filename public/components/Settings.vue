<template>
  <div id="settings">
    <div id="settings-content">
      <div id="stg-close" class="far fa-times" @click="hideSettings"></div>
      <div><label>Pomodoro duration:</label><input id="stg-duration" type="number" v-bind:value="duration" v-on:input="setDuration($event.target.value)" v-on:change="changeMinutes($event.target.value)"></div>
      <div><label>Always on top:</label><input id="stg-ontop" type="checkbox" :checked="alwaysOnTop" @input="setAlwaysOntop(!alwaysOnTop)"></div>
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
      'duration'
    ]),
    methods: {
      ...mapActions('settings', [
        'setDuration',
        'setAlwaysOntop',
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