<template>
  <div class="container">
    <header class="jumbotron">
      <!-- <h3>{{ content }}</h3> -->
        <img v-for="item in content" :key="item.image_id" :src="item.path_thumbnail" alt="" class="p-2 m-2">
    </header>
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