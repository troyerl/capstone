<template>
  <div class="login d-flex flex-column justify-content-center align-items-center">
    <b-card
      class="mb-2 login-card shadow-lg"
    >
      <div v-if="loggingIn" class="text-center">
        <b-spinner class="my-3" label="Logging In..."></b-spinner>
      </div>
      <div v-else>
        <b-form @submit="onLogin">
          <h1 class="text-center">Login</h1>
          <b-form-group
            id="input-group-1"
            label="Username:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="userInfo.username"
              type="text"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="userInfo.password"
              required
              type="password"
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <div v-if="error" class="text-center">
            <b-alert show variant="danger">{{error}}</b-alert>
          </div>
          <b-button type="submit" variant="primary" block class="mt-4">Login</b-button>
        </b-form>
      </div>
    </b-card>
    <p class="text-white">Don't an account? <router-link to="/signup">Signup!</router-link></p>

  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import routes from '../../router/routes';

export default {
  name: 'Login',
  data() {
    return {
      userInfo: {
        username: null,
        password: null
      },
      loggingIn: false,
      error: null
    }
  },
  methods: {
    async onLogin(e) {
      this.error = null;
      this.loggingIn = true;
      e.preventDefault();
      if (this.userInfo.username && this.userInfo.password) {
        try {
          const user = await Auth.signIn(this.userInfo.username, this.userInfo.password);
          this.$store.dispatch('getLoggedInUser', {
            username: this.userInfo.username,
            email: user.attributes.email,
            id: user.attributes.sub,
          });
          
          this.$router.push(routes.main);
        } catch (error) {
          this.error = error.message;
        }
      } else {
        this.error = 'Username and password required';
      } 

      this.loggingIn = false;
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh !important;
    background: #D8554D;
  }

  .login-card {
    width: 90vw;
  }

  @media only screen and (min-width: 768px) {
    .login-card {
      width: 30vw;
    }
  }
</style>