<template>
  <div class="signup d-flex flex-column justify-content-center align-items-center">
    <b-card
      class="mb-2 signup-card"
    >
      <b-form @submit="onSubmit">
        <h1 class="text-center">{{showUserAuth ? 'Input Code' : 'Signup'}}</h1>
        <div v-if="showUserAuth">
          <p class="text-center">A code has been sent to the email provided. Please copy that code and input below.</p>
          <b-form-group
            id="input-group-1"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="code"
              type="text"
              required
              placeholder="Enter code"
            ></b-form-input>
          </b-form-group>
          <div class="d-flex justify-content-center mt-4">
            <b-button type="button" variant="primary" class="mr-4" @click="showUserAuth = false">Cancel</b-button>
            <b-button type="submit" variant="primary">Confirm Code</b-button>
          </div>
        </div>
        <div v-else>
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

          <b-form-group
            id="input-group-1"
            label="Email:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="userInfo.attributes.email"
              type="email"
              required
              placeholder="Enter email"
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

          <b-form-group id="input-group-2" label="Confirm Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="confirmPassword"
              required
              type="password"
              placeholder="Confirm password"
            ></b-form-input>
          </b-form-group>
          
          <div v-if="error" class="text-center">
            <b-alert show variant="danger">{{error}}</b-alert>
          </div>
          <b-button type="submit" variant="primary">Signup</b-button>
        </div>
        
      </b-form>
    </b-card>
    <p class="text-white">Already an account? <router-link to="/">Login!</router-link></p>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import routes from '../../router/routes';

export default {
  name: 'Signup',
  data() {
    return {
      userInfo: {
        username: null,
        attributes: {
          email: null,
        },
        password: null
      },
      confirmPassword: null,
      showUserAuth: false,
      code: null,
      id: null,
      error: null
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const self = this;
      if (self.showUserAuth) {
        Auth.confirmSignUp(self.userInfo.username, self.code).then(() => {
          self.$store.dispatch('setNewUser', {
            username: self.userInfo.username,
            email: self.userInfo.attributes.email,
            id: self.id
          });
          self.$router.push(routes.main);
        }).catch(err => {
          self.error = err.message;
        });
      } else {
        if (self.userInfo.username && self.userInfo.attributes.email && self.userInfo.password && self.confirmPassword) {
          if (self.confirmPassword === self.userInfo.password) {
            Auth.signUp(self.userInfo)
              .then(data => {
                self.showUserAuth = true;
                self.id = data.userSub;
              }).catch(err => {self.error = err.message});
          } else {
            self.error = 'Passwords do not match';
          }
        } else {
          self.error = 'Required info missing to create account';
        }
      }
    }
  }
}
</script>

<style scoped>
  .signup {
    width: 100vw;
    height: 100vh !important;
    background: #D8554D;
  }

  .signup-card {
    width: 90vw;
  }

  @media only screen and (min-width: 768px) {
    .signup-card {
      width: 30vw;
    }
  }
</style>