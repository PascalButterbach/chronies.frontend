<template>
  <div class="container-fluid">
    <h3 v-if="!currentUser">Einloggen oder Registrieren!</h3>
    <div v-else>
      <a :href="item.path" v-for="item in content" :key="item.image_id">
        <img :src="item.path_thumbnail" alt="" class="p-2 m-2" />
      </a>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>