<template>
  <site-header />
  <div id="app">
    <router-view />
  </div>
  <site-footer />
  <div id="modal" class="c-modal"></div>
</template>

<script>
import { reactive } from "vue";

import SiteHeader from "@/components/TheSiteHeader";
import SiteFooter from "@/components/TheSiteFooter";

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },
  provide: reactive({
    state: {
      suggestions: [],
      track: "",
      authToken: "",
      selectedTrack: {},
      tempo: "",
      recommendations: [],
      userToken: null,
      user: {},
      uris: [],
      loginLink: `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_SPOTIFY_ID}&response_type=token&redirect_uri=http:%2F%2Frunlist.michael-smedley.co.uk&scope=user-read-private%2cplaylist-modify-public`,
      playlistInfo: {
        name: "My Runlist",
        public: true,
        description: "A running playlist built by an API",
      },
    },
  }),
};
</script>

<style lang="scss">
@import "@/assets/style/style.scss";

body {
  color: $brand__black;
  font-family: $font__body;
}
</style>
