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

.c-modal {
  left: 50%;
  max-width: 768px;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 90vw;
  z-index: 1;

  > * {
    background: $brand__white;
    border-radius: 20px;
    padding: 1rem;
    position: relative;
    z-index: 1;
  }

  &:not(:empty) {
    &:after {
      background: rgba(0, 0, 0, 0.5);
      content: "";
      height: 200vh;
      left: 0;
      position: fixed;
      top: 0;
      transform: translate3d(-50%, -50%, 0);
      width: 200vw;
      z-index: -1;
    }
  }
}
</style>
