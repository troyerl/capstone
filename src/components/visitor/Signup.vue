<template>
  <div class="signup d-flex justify-content-center align-items-center">
    <b-card
    title="Card Title"
    class="mb-2 signup-card"
  >
    <b-form @submit="onSubmit">
      <div v-if="showUserAuth">
        <b-form-group
          id="input-group-1"
          label="Code:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="code"
            type="text"
            required
            placeholder="Enter code sent to email"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Confirm Code</b-button>
        <b-button type="button" variant="primary" @click="showUserAuth = false">Cancel</b-button>

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
            placeholder="Enter Email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="userInfo.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Confirm Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="confirmPassword"
            required
            placeholder="Confirm password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Signup</b-button>
      </div>
      
    </b-form>
  </b-card>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

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
      code: null
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.showUserAuth) {
        Auth.confirmSignUp(this.userInfo.username, this.code).then((res) => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      } else {
        if (this.confirmPassword === this.userInfo.password) {
        Auth.signUp(this.userInfo)
          .then(data => {
            this.showUserAuth = true;
            console.log(data);
          })
          .catch(err => console.log(err));
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
      width: 40vw;
    }
  }
</style>