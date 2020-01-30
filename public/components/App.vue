<template>
  <div style="width: 100%; height: 100%; overflow: hidden;" :class="[darkMode ? 'dark-mode': '']">
    <div id="drag"></div>
    <div id="settings-button" class="material-icons" @click="showSettings" v-if="!this.running">settings</div>
    <Settings v-if="isSettingsPageShow"></Settings>
    <div id="main" style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;" @mousedown="click" @mouseup="start">
      <p id="time">
        <input id="input" :value="getMinutes" type="number" @input="updateMinute"><span id="time-separator" style="width: 25px;">:</span><span id="secondes">{{getSeconds}}</span>
      </p>
    </div>
    <Indicators v-if="!this.running"></Indicators>
    <Actions v-if="this.running" :callback="updateTimer" :stop-callback="handleStop"></Actions>
  </div>
</template>

<script lang="ts">
    import Indicators from "./main/Indicators.vue";
    import Settings from "./Settings.vue";
    import Actions from "./Actions.vue";
    import timer from "../timer";

    import { TimerStatus } from "../store/timer";

    import { Action, Getter, State } from "vuex-class";

    import { Component, Vue } from "vue-property-decorator";
    import {ComponentOptions} from "vue";

    @Component({
        components: {Actions, Settings, Indicators}
    })
    export default class App extends Vue {
        clickPos = {
            x: 0,
            y: 0
        };

        ac() {
            try {
                this.electron = require('electron')
            } catch (e) {
                console.warn('electron has not been initialize')
            }
        }

        @Action('changeMinutes', {namespace: 'timer'}) changeMinutes!: ((minute: number) => void);
        @Action('changeState', {namespace: 'timer'}) changeState!: ((state: TimerStatus) => void);
        @Action('decount', {namespace: 'timer'}) decount!: ((value: number) => void);
        @Action('showSettings', {namespace: 'app'}) showSettings!: (() => void);
        @Action('add', {namespace: 'indicators'}) add!: (() => void);
        @Action('reset', {namespace: 'indicators'}) reset!: (() => void);

        @Getter('getMinutes', {namespace: 'timer'}) getMinutes!: () => number;
        @Getter('getSeconds', {namespace: 'timer'}) getSeconds!: () => number;

        @State('isSettingsPageShow', {namespace: 'app'}) isSettingsPageShow!: boolean;
        @State('running', {namespace: 'timer'}) running!: boolean;
        @State('minutes', {namespace: 'timer'}) minutes!: number;

        @State('current', {namespace: 'indicators'}) current!: number;
        @State('total', {namespace: 'indicators'}) total!: number;

        @State('darkMode', {namespace: 'settings'}) darkMode!: boolean;

        electron = require('electron');

        // constructor(options: ComponentOptions<V>) {
        //     super(options);
        //     try {
        //         this.electron = require('electron')
        //     } catch (e) {
        //         console.warn('electron has not been initialize')
        //     }
        // }

        updateMinute(event: Event): void {
            const number: number = (<HTMLInputElement>event.target).valueAsNumber;
            if (number > 100) {
                (<HTMLInputElement>event.target).valueAsNumber = 99;
                return this.changeMinutes(99);
            }
            this.changeMinutes(number);
        }

        click(event: MouseEvent): void {
            this.clickPos.x = event.screenX;
            this.clickPos.y = event.screenY;
        }

        start(event: MouseEvent): void {
            const target = <HTMLElement>event.target;
            if (target.id !== 'main') return;
            if (this.clickPos.x !== event.screenX || this.clickPos.y !== event.screenY) return;
            if (this.current === this.total) this.reset();
            this.changeState(TimerStatus.start);

            if (Object.keys(this.electron).length > 0) {
                this.electron.ipcRenderer.send('start')
            }

            timer.start({minutes: this.minutes}, this.updateTimer, this.handleStop);
        }

        updateTimer(info: number, previousValue: number): void {
            //@ts-ignore
            this.decount(Math.round(Math.abs(new Date(info) - new Date(previousValue)) / 1000));
        }

        handleStop(): void {
            this.changeState(TimerStatus.stop);
            this.add();
            if (Object.keys(this.electron).length > 0) {
                this.electron.ipcRenderer.send('end', true, {max: this.total, current: this.current})
            }
        }
    }
</script>

<style scoped>
</style>