<template>
  <form class="c-track-form" @submit.prevent="search">
    <input
      type="text"
      name="track"
      placeholder="Enter track name, artist etc."
      v-model="track"
    />

    <p>{{ track }}</p>

    <button type="submit">Search</button>
    <div class="suggestions" v-if="state.suggestions.length > 0">
      <h2>Suggestions</h2>
      <inline-list>
        <li v-for="suggestion in state.suggestions" :key="suggestion.id">
          <button @click="handleGetBpm(suggestion)" class="inline-btn">
            {{ suggestion.artists[0].name }} - {{ suggestion.name }}
          </button>
        </li>
      </inline-list>
    </div>
  </form>
</template>

<script>
import SongsModel from "@/api/SongsModel";

import InlineList from "./BaseListInline";

export default {
  name: "TheTrackFinder",

  inject: ["state"],

  components: {
    InlineList,
  },

  data() {
    return {
      timeout: null,
      debounceTimer: 1000
    }
  },

  computed: {
    track: {
      get() {
        return this.state.track;
      },
      set(newValue) {
        this.state.track = newValue
        if (this.timeout !== null) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.search(newValue);
        }, this.debounceTimer);
      },
    },
  },

  methods: {
    search(val) {
      // this.state.track = val
      SongsModel.searchTrack(val, this.state.authToken).then((resp) => {
        this.state.suggestions = resp;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-track-form {
  input,
  button,
  textarea {
    display: inline-block;
    font-size: 1.5rem;
    padding: 10px;
    width: 50vw;
  }
}
</style>
