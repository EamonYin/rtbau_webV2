<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <EamonPlanet msg="Welcome to Eamon Planet"/>
</template>

<script>
import EamonPlanet from './views/EamonPlanet.vue'

export default {
  name: 'App',
  components: {
    EamonPlanet
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
