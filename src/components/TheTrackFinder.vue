<template>
  <form class="c-track-form container" @submit.prevent="search">
    <div
      aria-expanded="false"
      aria-haspopup="grid"
      aria-owns="suggestions"
      class="sm-12"
      ref="textHolder"
      role="combobox"
    >
      <input
        id="trackInput"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="suggestions"
        aria-activedescendant=""
        type="text"
        name="track"
        placeholder="Enter track name, artist etc."
        v-model="track"
      />
    </div>
  </form>
  <div class="suggestions" id="suggestions" role="grid">
    <inline-list v-if="state.suggestions.length > 0">
      <li
        v-for="(suggestion, key) in state.suggestions"
        :key="suggestion.id"
        :class="{ focused: key === focusedEl }"
      >
        <track-card
          :track="suggestion"
          hide-preview
          @click="handleTrackClick(suggestion)"
        />
      </li>
    </inline-list>
  </div>
</template>

<script>
import SongsModel from "@/api/SongsModel";

import TrackCard from "./BaseCardTrack";
import InlineList from "./BaseListInline";

export default {
  name: "TheTrackFinder",

  inject: ["state"],

  components: {
    InlineList,
    TrackCard,
  },

  data() {
    return {
      timeout: null,
      debounceTimer: 1000,
      focusedEl: 0,
    };
  },

  computed: {
    suggestions() {
      return this.state.suggestions;
    },
    track: {
      get() {
        return this.state.track;
      },
      set(newValue) {
        this.state.track = newValue;
        if (newValue == "") {
          this.$refs["textHolder"].setAttribute("aria-expanded", false);
          this.state.suggestions = [];
          return;
        }
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
        this.$refs["textHolder"].setAttribute("aria-expanded", resp.length > 0);
      });
    },
    nextItem() {
      if (event.keyCode == 38 && this.focusedEl > 0) {
        this.focusedEl--;
      } else if (
        event.keyCode == 40 &&
        this.focusedEl < this.suggestions.length
      ) {
        this.focusedEl++;
      }
    },
  },

  watch: {
    suggestions(newValue) {
      if (newValue.length > 0) {
        document.addEventListener("keyup", this.nextItem);
      } else {
        document.removeEventListener("keyup", this.nextItem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-track-form {
  @apply bg-white-500 shadow-lg border-black-200 rounded-sm p-4 text-center mb-4;

  input,
  button,
  textarea {
    @apply bg-transparent border-0 inline-block text-sm-p w-full;

    @screen md {
      @apply text-md-p
    }

    @screen lg {
      @apply text-lg-p
    }
  }
}
</style>
