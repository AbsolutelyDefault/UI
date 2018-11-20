<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('updateLoginStatus');
  },
};
</script>

<style>
  body, html, #app {
    height: 100%;
  }
</style>
