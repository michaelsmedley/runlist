<template>
  <form class="c-track-form" @submit.prevent="search">
    <input
      class="c-track-form__input"
      id="trackInput"
      autocomplete="off"
      type="text"
      name="track"
      placeholder="Enter track name, artist etc."
      v-model="track"
    />
    <button type="submit" class="c-track-form__submit">Search</button>
  </form>
</template>

<script>
import SongsModel from "@/api/SongsModel";

export default {
  name: "TheTrackFinder",

  inject: ["state"],

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
      },
    },
  },

  methods: {
    search() {
      // this.state.track = val
      SongsModel.searchTrack(this.state.track, this.state.authToken).then(
        (resp) => {
          this.state.suggestions = resp;
        }
      );
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
  align-items: center;
  background: $color--secondary;
  border: 2px solid $color--primary;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 1vmax;
  width: 100%;
  transition: all ease-in-out .2s;

  &:focus-within {
    border-color: lighten($color--primary, 30%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  &__input {
    border: 0;

    &:focus {
      outline: none;
    }
  }

  &__submit {
    background: $color--secondary;
    border: 0;
    color: $color--primary;
    font-size: var(--step-0);
    margin-bottom: 0;
    text-transform: uppercase;
  }
}

.suggestions ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
