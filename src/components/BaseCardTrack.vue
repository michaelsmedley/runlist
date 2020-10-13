<template>
  <button
    class="c-card flex p-5 mb-4 items-center row w-full gap-5 bg-white-500"
    :class="{ 'c-card--track--mini': mini, 'c-card--track--no-hover': noHover }"
    @click="handleClick(track)"
  >
    <div
      class="c-card--track__img hidden md:block"
      :class="{ 'md-1': mini, 'md-2': !mini }"
    >
      <picture>
        <source
          :srcset="track.album.images[1].url"
          media="(min-width: 768px)"
          :alt="`Image cover for ${track.name} by ${track.artists[0].name}`"
          loading="lazy"
        />
        <img
          :src="track.album.images[2].url"
          :alt="`Image cover for ${track.name} by ${track.artists[0].name}`"
          loading="lazy"
          width="200"
          height="200"
        />
      </picture>
    </div>
    <div
      class="c-card--track__info text-left"
      :class="{ 'w-7/12': !hidePreview, 'w-full md:w-7/12': hidePreview }"
    >
      <h3>{{ track.artists[0].name }} - {{ track.name }}</h3>
      <p>{{ track.album.name }}</p>
    </div>
    <div
      class="c-card--track__preview text-right"
      v-if="!hidePreview"
      :class="{ 'w-1/3': mini, 'w-1/4': !mini }"
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
.c-card {
  @apply relative;

  &:after {
    @apply absolute block bg-gradient-to-r from-green-500 to-blue-500 mx-auto;
    content: '';
    height: 1px;
    width: calc(100% - theme('padding.5') * 2);
    z-index: -1;
    bottom: -1px;
  }
}
</style>
