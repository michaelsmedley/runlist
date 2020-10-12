<template>
  <button
    class="c-card--track p-2 mb-4 items-center"
    :class="{ 'c-card--track--mini': mini, 'c-card--track--no-hover': noHover }"
    @click="handleClick(track)"
  >
    <div
      class="c-card--track__img hidden md-block"
      :class="{ 'md-1': mini, 'md-2': !mini }"
    >
      <picture>
        <source
          :srcset="track.album.images[1].url"
          media="(min-width: 768px)"
          :alt="`Image cover for ${track.name} by ${track.artists[0].name}`"
          width="300"
          height="300"
          loading="lazy"
        />
        <img
          :src="track.album.images[2].url"
          :alt="`Image cover for ${track.name} by ${track.artists[0].name}`"
          loading="lazy"
          width="64"
          height="64"
        />
      </picture>
    </div>
    <div
      class="c-card--track__info"
      :class="{ 'sm-7': !hidePreview, 'sm-12 md-7': hidePreview }"
    >
      <p class="my-1">
        <strong>{{ track.artists[0].name }} - {{ track.name }}</strong>
      </p>
      <p>{{ track.album.name }}</p>
    </div>
    <div
      class="c-card--track__preview text-right"
      v-if="!hidePreview"
      :class="{ 'sm-4': mini, 'sm-3': !mini }"
    >
      <base-link :href="track.preview_url" pill primary target="_blank"
        >Preview</base-link
      >
    </div>
  </button>
</template>

<script>
import BaseLink from "./BaseLink";

export default {
  props: {
    track: {
      type: Object,
      default: () => {},
    },
    hidePreview: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    BaseLink,
  },

  emits: ["track"],

  methods: {
    handleClick(track) {
      this.$emit("click", track);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
