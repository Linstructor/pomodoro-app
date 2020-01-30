<template>
  <div id="indicator-container">
    <div>
      <div class="rect"></div>
      <template v-for="number in total">
        <div class="circle" v-bind:class="{ active: current > number - 1 }" v-on:click="set(number)" :key="number"></div>
        <div class="rect"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import { Action, State } from "vuex-class";

  @Component({
    name: "Indicators"
  })
  export default class Indicators extends Vue{
    @State('current', {namespace: 'indicators'}) current!: number;
    @State('total', {namespace: 'indicators'}) total!: number;

    @Action('set', {namespace: 'indicators'}) set!: (value: number) => void;
  }
</script>

<style scoped>

</style>