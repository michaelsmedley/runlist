<template>
  <div class="home">
    <intro-block is-large overlap>
      <div class="container px-1 md:px-0 mx-auto">
        <div class="text-center">
          <h2>Runlist brings the playlist,<br />you bring the awesome</h2>
        </div>
      </div>
    </intro-block>

    <div class="container mx-auto">
      <div class="text-center">
        <track-finder @selected="handleGetBpm" />
        <p>
          Runlist will generate a Spotify playlist for you based on the BPM of
          your favourite running track, so that you can make sure your pace
          never drops.
        </p>
        <p>Filter tracks by artists or genre to get your perfect mix</p>
      </div>
    </div>

    <div class="container container--bleed">
      <div class="scroll-snap">
        <div class="snap-child lg:w-1/3">
          <base-cta>
            <template #icon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 26.25L18.75 18.75M21.25 12.5C21.25 13.6491 21.0237 14.7869 20.5839 15.8485C20.1442 16.9101 19.4997 17.8747 18.6872 18.6872C17.8747 19.4997 16.9101 20.1442 15.8485 20.5839C14.7869 21.0237 13.6491 21.25 12.5 21.25C11.3509 21.25 10.2131 21.0237 9.15152 20.5839C8.08992 20.1442 7.12533 19.4997 6.31282 18.6872C5.5003 17.8747 4.85578 16.9101 4.41605 15.8485C3.97633 14.7869 3.75 13.6491 3.75 12.5C3.75 10.1794 4.67187 7.95376 6.31282 6.31282C7.95376 4.67187 10.1794 3.75 12.5 3.75C14.8206 3.75 17.0462 4.67187 18.6872 6.31282C20.3281 7.95376 21.25 10.1794 21.25 12.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
            <h5>Pick your song</h5>
            <p>
              Search the Spotify library to find the song that helps you keep
              pace.
            </p>
          </base-cta>
        </div>

        <div class="snap-child lg:w-1/3">
          <base-cta>
            <template #icon>
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 16.5H21M1 1.5H21H1ZM1 6.5H21H1ZM1 11.5H21H1Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
            <h5>Get your list</h5>
            <p>
              Runlist will build a playlist for you based on the tempo and genre
              of your song.
            </p>
          </base-cta>
        </div>

        <div class="snap-child lg:w-1/3">
          <base-cta>
            <template #icon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17.5V5M10 8.75H6.25C5.58696 8.75 4.95107 9.01339 4.48223 9.48223C4.01339 9.95107 3.75 10.587 3.75 11.25V22.5C3.75 23.163 4.01339 23.7989 4.48223 24.2678C4.95107 24.7366 5.58696 25 6.25 25H23.75C24.413 25 25.0489 24.7366 25.5178 24.2678C25.9866 23.7989 26.25 23.163 26.25 22.5V11.25C26.25 10.587 25.9866 9.95107 25.5178 9.48223C25.0489 9.01339 24.413 8.75 23.75 8.75H20H10ZM18.75 13.75L15 17.5L18.75 13.75ZM15 17.5L11.25 13.75L15 17.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
            <h5>Make it yours</h5>
            <p>
              Save your playlist, and get back to smashing your PB
            </p>
          </base-cta>
        </div>
      </div>
    </div>

    <div v-if="state.selectedTrack && state.tempo" class="container">
      <div class="sm-12 text-center">
        <p>
          <strong>{{ state.selectedTrack.name }}</strong> has a tempo of
          <strong>{{ state.tempo }}</strong>
        </p>

        <p class="as-h3">Here are some recommendations</p>
      </div>
      <div v-if="state.recommendations.length > 0" class="sm-12">
        <inline-list>
          <li
            v-for="recommendation in state.recommendations"
            :key="recommendation.id"
          >
            <track-card :track="recommendation" mini no-hover />
          </li>
        </inline-list>
        <p class="text-center">
          <button
            @click="handleGeneratePlaylist"
            type="button"
            class="pill primary"
            v-if="state.user.id"
          >
            Save to playlist?
          </button>
          <base-link :href="state.loginLink" pill secondary v-else
            >Please login to save your playlist</base-link
          >
        </p>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <div v-if="modalOpen">
      <form method="post" @submit.prevent="saveToPlaylist">
        <p>
          <label for="name"
            >Playlist name<br />
            <input type="text" v-model="state.playlistInfo.name" id="name" />
          </label>
        </p>
        <p>
          <label for="description"
            >Description<br />
            <textarea
              v-model="state.playlistInfo.description"
              id="description"
            ></textarea
          ></label>
        </p>
        <p class="text-center">
          <button type="submit" class="pill primary">Save</button>
        </p>

        <p v-if="saved">
          <span v-if="saved === true"
            >The playlist has been saved!
            <base-link href="/">Click here to start again</base-link></span
          >
          <span v-else>The playlist has not been saved!</span>
        </p>
      </form>
    </div>
  </teleport>
</template>

<script>
import AuthModel from "@/api/AuthModel";
import SongsModel from "@/api/SongsModel";

import BaseLink from "@/components/BaseLink";
import InlineList from "@/components/BaseListInline";
import IntroBlock from "@/components/BaseIntroBlock";
import TrackFinder from "@/components/TheTrackFinder";
import TrackCard from "@/components/BaseCardTrack";
import BaseCta from "@/components/BaseCta";

export default {
  name: "Home",

  components: {
    BaseLink,
    InlineList,
    IntroBlock,
    TrackCard,
    TrackFinder,
    BaseCta,
  },

  inject: ["state"],

  data() {
    return {
      modalOpen: false,
      status: null,
      saved: null,
    };
  },

  computed: {
    track() {
      return this.state.track;
    },
  },

  methods: {
    handleGeneratePlaylist() {
      if (!this.state.userToken) {
        window.location.href = this.state.loginLink;
        //Put state in localStorage so that when we come back it is available
        localStorage.setItem("runlist_state", JSON.stringify(this.state));
        return;
      }

      this.modalOpen = true;
    },
    handleGetBpm(track) {
      this.state.selectedTrack = track;
      this.state.suggestions = [];
      SongsModel.getTrackInfo(track.id, this.state.authToken).then((resp) => {
        this.state.tempo = resp;

        // get recomendations
        SongsModel.getRecommendations(
          resp,
          track.id,
          this.state.authToken
        ).then((resp) => {
          this.state.recommendations = resp;
        });
      });
    },
    saveToPlaylist() {
      const ids = this.state.recommendations.map((track) => track.uri);
      this.state.uris = ids;

      // get details about the user, create playlist, add songs

      //create a playlist
      //TODO: Should be a playlist model
      SongsModel.createPlaylist(
        this.state.user.id,
        this.state.playlistInfo,
        this.state.userToken
      ).then((resp) => {
        // then add songs to it
        SongsModel.addSongsToPlaylist(
          resp.id,
          this.state.user.id,
          this.state.uris,
          this.state.userToken
        )
          .then(() => {
            this.saved = true;
          })
          .catch(() => {
            this.saved = false;
          });
      });
    },
  },

  mounted() {
    // if we have state in localstorage, implement it and then clear
    if (localStorage.getItem("runlist_state")) {
      this.state = JSON.parse(localStorage.getItem("runlist_state"));
      localStorage.removeItem("runlist_state");
    }

    // get app access token
    if (this.state.authToken == "") {
      AuthModel.getAppToken().then((token) => {
        this.state.authToken = token;
      });
    }

    // get user access token from hash string if it exists
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      if (params.get("access_token")) {
        this.state.userToken = params.get("access_token");
        AuthModel.getCurrentUser(this.state.userToken).then((resp) => {
          this.state.user = resp;
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
