<template>
  <div class="c-suggestions container">
    <inline-list>
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
import InlineList from "@/components/BaseListInline";
import TrackCard from "@/components/BaseCardTrack";
export default {
  name: "TheSuggestionsList",
  components: {
    InlineList,
    TrackCard,
  },

  inject: ["state"],

  emits: ["selected"],

  methods: {
    handleTrackClick(track) {
      this.$emit("selected", track);
    },
  },

  computed: {
    suggestions() {
      return this.state.suggestions;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
