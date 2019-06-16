import { TimerStatus } from "../store/timer";
import { TimerStatus } from "../store/timer";
import { TimerStatus } from "../store/timer";
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

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import timer, { Callback, CallBackEnd } from "../timer";

  import { Action, State } from "vuex-class";
  import { TimerStatus } from "../store/timer";

  @Component({
    name: "Actions"
  })
  export default class Actions extends Vue{
    show = false;

    @Prop() callback!: Callback;
    @Prop() stopCallback!: CallBackEnd;

    @State('running', { namespace: 'timer' }) running!: boolean;
    @State('paused', { namespace: 'timer' }) paused!: boolean;
    @State('minutes', { namespace: 'timer' }) minutes!: number;
    @State('seconds', { namespace: 'timer' }) seconds!: number;

    @Action('changeState', { namespace: 'timer' }) changeState!: (status: TimerStatus) => void;

    changeShowState(state: boolean) {
      this.show = state;
    }

    reset() {
      this.changeState(TimerStatus.stop);
      console.log('stop', timer.stop());
    }

    pause() {
      timer.stop();
      this.changeState(TimerStatus.pause);
    }

    resume() {
      console.log(this.minutes, this.seconds);
      this.changeState(TimerStatus.start);
      timer.start({minutes: this.minutes, seconds: this.seconds}, this.callback, this.stopCallback)
    }
  }
</script>

<style scoped>

</style>