<template>
  <div id="actions" @mouseenter="changeShowState(true)" @mouseleave="changeShowState(false)">
    <div v-if="show">
      <div>
        <div id="restart" @click="reset"><p class="material-icons">restore</p></div>
        <div v-if="!this.paused" @click="pause">
          <p id="pause" class="material-icons">pause</p>
        </div>
        <div id="playback" v-if="this.paused" @click="resume">
          <p class="material-icons">play_arrow</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import timer from '../timer'

  export default {
    name: "Actions",
    data() {
      return {
        show: false,
      }
    },
    props: {
      callback: Function,
      stopCallback: Function
    },
    computed: {
      ...mapState('timer', ['running', 'paused', 'minutes', 'seconds'])
    },
    methods: {
      changeShowState(state) {
        this.show = state;
      },
      ...mapActions('timer', ['changeState']),
      reset() {
        this.changeState('stop');
        console.log('stop', timer.stop());
      },
      pause() {
        timer.stop();
        this.changeState('pause');
      },
      resume() {
        console.log(this.minutes, this.seconds);
        this.changeState('start');
        timer.start({minutes: parseInt(this.minutes), seconds: this.seconds}, this.callback, this.stopCallback)
      }
    }
  }
</script>

<style scoped>

</style>