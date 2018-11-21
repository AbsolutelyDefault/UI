<template>
  <div id="login-page">
    <form class="text-center form-signin">
      <h1 class="h1 mb-3 font-weight-bold">D E F A U L T</h1>
      <b-alert v-if="failed" show variant="danger">Failed to sign in</b-alert>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <b-button variant="danger" size="lg" @click="auth('google')">
        <font-awesome-icon :icon="['fab', 'google-plus-g']"/>Sign in with Google
      </b-button>
    </form>
  </div>
</template>

<script>
import bButton from 'bootstrap-vue/es/components/button/button';
import bAlert from 'bootstrap-vue/es/components/alert/alert';

export default {
  data() {
    return {
      failed: false,
    };
  },
  name: 'Login',
  components: {
    'b-button': bButton,
    'b-alert': bAlert,
  },
  methods: {
    auth(provider) {
      this.$store.dispatch('signInSocial', { provider })
        .then(() => {
          this.$router.push({ name: 'Board' });
        })
        .catch(() => {
          this.failed = true;
        });
    },
  },
};
</script>
<style>
  #login-page {
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
</style>
