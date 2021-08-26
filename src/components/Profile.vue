<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong
          >[{{ currentUser.aud[0] }}] [{{ currentUser.sub }}] [{{
            currentUser.aud[1]
          }}]</strong
        >
      </h3>

      <div class="m-5">
        <strong>Token:</strong>
        <div class="text-truncate">
          {{ rawData.access_token }}
        </div>
        <div class="badge badge-dark text-wrap w-100 d-block">
          Läuft ab in: {{ rawData.at_expires_in }} | um:
          {{ rawData.at_expires_at }}
        </div>
      </div>
      <div class="m-5">
        <strong>Refresh Token:</strong>
        <div class="text-truncate">
          {{ rawData.refresh_token }}
        </div>
        <div class="badge badge-dark text-wrap w-100 d-block">
          Läuft ab in: {{ rawData.rt_expires_in }} | um:
          {{ rawData.rt_expires_at }}
        </div>
      </div>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">Rollen:{{ role }}</li>
      </ul>
    </header>
  </div>
</template>

<script>
import parseJwt from "../services/jwt.decode.js";
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return parseJwt(this.$store.state.auth.user.access_token);
    },
    rawData() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>