<template>
  <form class="c-track-form container" @submit.prevent="search">
    <div class="sm-12 md-11">
      <input
        type="text"
        name="track"
        placeholder="Enter track name, artist etc."
        v-model="track"
      />
    </div>
    <div class="hidden md-block md-1">
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 489.713 489.713"
          height="30"
          width="30"
        >
          <path
            d="M483.4 454.444l-121.3-121.4c28.7-35.2 46-80 46-128.9 0-112.5-91.5-204.1-204.1-204.1S0 91.644 0 204.144s91.5 204 204.1 204c48.8 0 93.7-17.3 128.9-46l121.3 121.3c8.3 8.3 20.9 8.3 29.2 0s8.3-20.7-.1-29zm-442.7-250.3c0-90.1 73.2-163.3 163.3-163.3s163.4 73.3 163.4 163.4-73.3 163.4-163.4 163.4-163.3-73.4-163.3-163.5z"
          />
        </svg>
      </button>
    </div>
    <div class="suggestions" v-if="state.suggestions.length > 0">
      <h2>Suggestions</h2>
      <inline-list>
        <li v-for="suggestion in state.suggestions" :key="suggestion.id">
          <button @click="handleTrackClick(suggestion)" class="inline-btn">
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
      debounceTimer: 1000,
    };
  },

  computed: {
    track: {
      get() {
        return this.state.track;
      },
      set(newValue) {
        this.state.track = newValue;
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
    handleTrackClick(track) {
      this.$emit("selected", track);
    },
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
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  box-sizing: border-box;
  border: 1px solid $brand__tint;
  padding: 1rem;
  text-align: center;
  input,
  button,
  textarea {
    background: transparent;
    border: none;
    box-sizing: border-box;
    display: inline-block;
    font-size: 1.5rem;
    width: 100%;
  }
}
</style>
