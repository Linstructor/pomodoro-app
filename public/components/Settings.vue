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

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { Action, State } from "vuex-class";

  @Component({
    name: "settings"
  })
  export default class Settings extends Vue {
    @Action('setDuration', {namespace: 'settings'}) setDuration!: ((minute: number) => void);
    @Action('setAlwaysOntop', {namespace: 'settings'}) setAlwaysOntop!: ((minute: number) => void);
    @Action('changeDarkModeState', {namespace: 'settings'}) changeDarkModeState!: ((minute: number) => void);
    @Action('changeAutoDarkModeState', {namespace: 'settings'}) changeAutoDarkModeState!: ((minute: number) => void);

    @Action('changeMinutes', {namespace: 'timer'}) changeMinutes!: ((minute: number) => void);

    @Action('hideSettings', {namespace: 'app'}) hideSettings!: ((minute: number) => void);

    @State('alwaysOnTop', {namespace: 'settings'}) alwaysOnTop!: number;
    @State('duration', {namespace: 'settings'}) duration!: number;
    @State('darkMode', {namespace: 'settings'}) darkMode!: number;
    @State('autoDarkMode', {namespace: 'settings'}) autoDarkMode!: number;
  }
</script>

<style scoped>

</style>