<template>
  <div id="board">
    <menu-bar></menu-bar>
    <b-container>
      <b-row class="justify-content-md-center">
        <h1>Board goes here</h1>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import MenuBar from '@/components/MenuBar.vue';

export default {
  name: 'Board',
  components: {
    'b-container': bContainer,
    'b-row': bRow,
    'menu-bar': MenuBar,
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('updateLoginStatus');
    });
  },
};
</script>
