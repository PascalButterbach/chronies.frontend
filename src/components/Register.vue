<template>
  <div class="container-fluid p-5  ">
    <div class="card card-container p-5 w-50 m-auto">
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="user_name">Username</label>
            <Field name="user_name" type="text" class="form-control" />
            <ErrorMessage name="user_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-dark btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Registrieren
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="!successful && message"
        class="alert alert-danger"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      user_name: yup
        .string()
        .required("Username ist erforderlich!")
        .min(3, "Muss mindestens 3 Zeichen haben!")
        .max(20, "Darf maximal 20 Zeichen haben!"),
      email: yup
        .string()
        .required("Email ist erforderlich!")
        .email("Email is invalid!")
        .max(50, "Darf maximal 50 Zeichen haben!"),
      password: yup
        .string()
        .required("Password ist erforderlich!")
        .min(6, "Muss mindestens 6 Zeichen haben!")
        .max(40, "Darf maximal 40 Zeichen haben!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>