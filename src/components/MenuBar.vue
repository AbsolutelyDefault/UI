<template>
  <b-navbar toggleable="md" type="dark" variant="primary" id="menu-bar">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">D E F A U L T</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto" right>
        <b-button variant="outline-light" @click="signOut()">
          Signout
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
import bButton from 'bootstrap-vue/es/components/button/button';

export default {
  name: 'MenuBar',
  components: {
    'b-navbar': bNavbar,
    'b-navbar-toggle': bNavbarToggle,
    'b-navbar-brand': bNavbarBrand,
    'b-collapse': bCollapse,
    'b-navbar-nav': bNavbarNav,
    'b-button': bButton,
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>
