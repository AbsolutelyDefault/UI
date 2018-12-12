<template>
  <div>
  <b-navbar toggleable="md" type="dark" variant="primary" id="menu-bar">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="board">D E F A U L T</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-button variant="outline-light" @click="modalShow = !modalShow">
          Get Link
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
        <b-button variant="outline-light" @click="signOut()">
          Signout
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <b-modal size="lg" v-model="modalShow">
      <h6 slot="modal-header">Link to this board</h6>
      <div slot="modal-footer"></div>
      <b-input-group>
        <b-form-input class="form-control" :value="getCurrentPath" disabled></b-form-input>
        <b-input-group-append>
          <b-button variant="primary sm" v-clipboard:copy="getCurrentPath">
            Click To Copy
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
  </div>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
import bButton from 'bootstrap-vue/es/components/button/button';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
import bInputGroupAppend from 'bootstrap-vue/es/components/input-group/input-group-append';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';

export default {
  name: 'MenuBar',
  props: {
    boardId: String,
  },
  components: {
    'b-navbar': bNavbar,
    'b-navbar-toggle': bNavbarToggle,
    'b-navbar-brand': bNavbarBrand,
    'b-collapse': bCollapse,
    'b-navbar-nav': bNavbarNav,
    'b-button': bButton,
    'b-modal': bModal,
    'b-input-group': bInputGroup,
    'b-input-group-append': bInputGroupAppend,
    'b-form-input': bFormInput,
  },
  data() {
    return {
      modalShow: false,
    };
  },
  computed: {
    getCurrentPath() {
      const props = this.$router.resolve({
        name: 'Board',
      });
      const { location } = window;
      return `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}${props.href}?id=${this.boardId}`;
    },
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
