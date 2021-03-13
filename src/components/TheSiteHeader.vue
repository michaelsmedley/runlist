<template>
  <header class="c-site-header u-ta-right">
    <div class="container">
      <button-link
        class="text-secondary"
        :href="loginLink"
        pill
        primary
        v-if="!user.id"
        is-external
        >Login with Spotify</button-link
      >
      <user-card v-else>
        <template #img>
          <avatar
            :src="user.images[0].url"
            :title="`Avatar image for ${user.id}`"
          /> </template
      ></user-card>
    </div>
  </header>
</template>

<script>
import Avatar from "@/components/BaseAvatar";
import ButtonLink from "@/components/ButtonLink";
import UserCard from "@/components/BaseCardUser";
export default {
  name: "TheSiteHeader",

  inject: ["state"],

  components: {
    Avatar,
    ButtonLink,
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
.c-site-header {
  background: $color--primary;
  margin-bottom: 0;
  padding: 1vmax 0;
}
</style>
