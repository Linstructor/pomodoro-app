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

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "Indicators",
    computed: {
      ...mapState('indicators', ['current', 'total']),
    },
    methods: {
      ...mapActions('indicators', ['set']),
    }
  }
</script>

<style scoped>

</style>