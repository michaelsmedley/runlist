<template>
  <div class="home">
    <intro-block is-large overlap>
      <div class="container">
        <div class="text-center">
          <h2>Generate a playlist for your next 💪💪</h2>
        </div>
      </div>
    </intro-block>

    <div class="container">
      <track-finder @selected="handleGetBpm" />
    </div>

    <suggestions-list
      v-if="state.suggestions.length > 0"
      @selected="handleGetBpm"
    />

    <div class="container" v-else-if="isEmptyState">
      <p>
        Runlist will generate a Spotify playlist for you based on the BPM of
        your favourite running track, so that you can make sure your pace never
        drops.
      </p>
      <p>Filter tracks by artists or genre to get your perfect mix</p>
    </div>

    <div v-if="state.selectedTrack && state.tempo" class="container">
      <div class="sm-12 text-center">
        <p>
          <strong>{{ state.selectedTrack.name }}</strong> has a tempo of
          <strong>{{ state.tempo }}</strong>
        </p>

        <p>Here's your suggested playlist</p>
      </div>
      <div v-if="state.recommendations.length > 0" class="sm-12">
        <inline-list is-column>
          <li
            v-for="recommendation in state.recommendations"
            :key="recommendation.id"
          >
            <track-card :track="recommendation" as-row no-hover />
          </li>
        </inline-list>
        <p class="text-center">
          <button
            @click="handleGeneratePlaylist"
            type="button"
            class="as-link"
            v-if="state.user.id"
          >
            Save to playlist?
          </button>
          <base-link :href="state.loginLink" pill secondary v-else
            >Login to Spotify to save your playlist</base-link
          >
        </p>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <form method="post" @submit.prevent="saveToPlaylist" v-if="modalOpen">
      <fieldset>
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
          <button type="submit" class="pill primary">Save</button>&nbsp;
          <button type="button" class="pill primary" @click="modalOpen = false">
            Close
          </button>
        </p>

        <p v-if="saved">
          <span v-if="saved === true"
            >The playlist has been saved!
            <base-link href="/">Click here to start again</base-link></span
          >
          <span v-else>The playlist has not been saved!</span>
        </p>
      </fieldset>
    </form>
  </teleport>
</template>

<script>
import AuthModel from "@/api/AuthModel";
import SongsModel from "@/api/SongsModel";

import BaseLink from "@/components/BaseLink";
import InlineList from "@/components/BaseListInline";
import IntroBlock from "@/components/BaseIntroBlock";
import TrackFinder from "@/components/TheTrackFinder";
import SuggestionsList from "@/components/TheSuggestionsList";
import TrackCard from "@/components/BaseCardTrack";

export default {
  name: "Home",

  components: {
    BaseLink,
    InlineList,
    IntroBlock,
    TrackCard,
    TrackFinder,
    SuggestionsList,
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
    isEmptyState() {
      return (
        this.state.suggestions.length == 0 &&
        Object.keys(this.state.selectedTrack).length == 0
      );
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
