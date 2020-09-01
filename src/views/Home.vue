<template>
  <div class="home">
    <h1>Search for a track to begin</h1>
    <p v-if="state.authToken">Connected with token {{ state.authToken }}</p>
    <p v-if="state.userToken">User authorised with {{ state.userToken }}</p>
    <p v-if="state.user.id">Hello {{ state.user.id }}</p>

    <track-finder @selected="handleGetBpm" />

    <div v-if="state.selectedTrack && state.tempo">
      <p>
        <strong>{{ state.selectedTrack.name }}</strong> has a tempo of
        <strong>{{ state.tempo }}</strong>
      </p>
    </div>
    <div v-if="state.recommendations.length > 0">
      <h3>Here are some recommendations</h3>
      <ul class="inline-list">
        <li
          v-for="recommendation in state.recommendations"
          :key="recommendation.id"
        >
          {{ recommendation.artists[0].name }} - {{ recommendation.name }}
        </li>
      </ul>
      <button @click="handleGeneratePlaylist" type="button">
        Save to playlist?
      </button>
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
        <button type="submit">Save</button>
      </form>
    </div>
  </teleport>
</template>

<script>
import AuthModel from "@/api/AuthModel";
import SongsModel from "@/api/SongsModel";

import TrackFinder from "@/components/TheTrackFinder";

export default {
  name: "Home",

  components: {
    TrackFinder,
  },

  inject: ["state"],

  data() {
    return {
      modalOpen: false,
      status: null,
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
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_SPOTIFY_ID}&response_type=token&redirect_uri=http:%2F%2Frunlist.michael-smedley.co.uk&scope=user-read-private%2cplaylist-modify-public`;
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
            this.status = "Playlist saved!!";
          })
          .catch((err) => {
            this.status = err;
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

  // setup(context) {
  //   let status;

  //   // get details of the track we've selected
  //   const handleGetBpm = (track) => {
  //     state.selectedTrack = track;
  //     state.suggestions = [];
  //     SongsModel.getTrackInfo(track.id, state.authToken).then((resp) => {
  //       state.tempo = resp;

  //       // get recomendations
  //       SongsModel.getRecommendations(resp, track.id, state.authToken).then(
  //         (resp) => {
  //           state.recommendations = resp;
  //         }
  //       );
  //     });
  //   };

  //   // If the user is not logged in, get user to authorize, else show modal to add playlist info
  //   const addPlaylistInfo = () => {
  //     if (!state.userToken) {
  //       window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_SPOTIFY_ID}&response_type=token&redirect_uri=http:%2F%2Frunlist.michael-smedley.co.uk&scope=user-read-private%2cplaylist-modify-public`;
  //       return;
  //     }

  //     modalOpen.value = true;
  //   };

  //   // map all the track uris and save to playlist
  //   const saveToPlaylist = () => {
  //     const ids = state.recommendations.map((track) => track.uri);
  //     state.uris = ids;

  //     // get details about the user, create playlist, add songs
  //     AuthModel.getCurrentUser(state.userToken).then((resp) => {
  //       const userId = resp.id;

  //       //create a playlist
  //       //TODO: Should be a playlist model
  //       SongsModel.createPlaylist(
  //         userId,
  //         state.playlistInfo,
  //         state.userToken
  //       ).then((resp) => {
  //         // then add songs to it
  //         SongsModel.addSongsToPlaylist(
  //           resp.id,
  //           userId,
  //           state.uris,
  //           state.userToken
  //         )
  //           .then(() => {
  //             this.status = "Playlist saved!!";
  //           })
  //           .catch((err) => {
  //             this.status = err;
  //           });
  //       });
  //     });
  //   };

  //   // when someone types in the search box, run debounce function
  //   watch(
  //     () => state.track,
  //     (track) => {
  //       debounceListener(track);
  //     }
  //   );

  //   return {
  //     state,
  //     debounceListener,
  //     handleGetBpm,
  //     saveToPlaylist,
  //     status,
  //     modalOpen,
  //     addPlaylistInfo,
  //   };
  // },
};
</script>

<style lang="scss" scoped></style>
