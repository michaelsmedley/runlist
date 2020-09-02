<template>
  <header class="c-header--app">
    <div class="container">
      <div class="sm-6 items-start self-center">
        <h1 class="uppercase text-white as-h5">Runlist</h1>
      </div>
      <div class="sm-6 items-end self-center">
        <base-link :href="loginLink" pill primary v-if="!user.id"
          >Login</base-link
        >
        <user-card v-else>
          <template #img>
            <avatar
              :src="user.images[0].url"
              :title="`Avatar image for ${user.id}`"
            /> </template
          >{{ user.id }}</user-card
        >
      </div>
    </div>
  </header>
</template>

<script>
import Avatar from "@/components/BaseAvatar";
import BaseLink from "@/components/BaseLink";
import UserCard from "@/components/BaseCardUser";
export default {
  name: "TheSiteHeader",

  inject: ["state"],

  components: {
    Avatar,
    BaseLink,
    UserCard,
  },

  data() {
    return {
      loginLink: this.state.loginLink,
    };
  },
  computed: {
    user() {
      return this.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-header--app {
  background: $brand__black;
  padding: 0 0.5rem;

  @include media(">=md") {
    padding: 1rem;
  }
}
</style>
