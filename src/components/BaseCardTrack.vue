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
.c-card--track {
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border: 1px solid $brand__tint;
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 1rem;
  text-align: left;
  transition: all ease-in-out 0.2s;
  width: 100%;

  &__img {
    picture,
    img,
    source {
      height: auto;
      width: 100%;
    }
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
      color: $brand__primary;
      transform: scale(1.02);
    }
  }

  &--mini {
    border: 0;
    border-bottom: 1px solid $brand__tint;
    border-radius: 0;
    box-shadow: none;
    font-size: 1rem;
    margin-bottom: 0;

    img {
      max-width: 64px;
    }
  }

  &--no-hover {
    cursor: default;

    &:hover {
      box-shadow: none;
      color: $brand__black;
      transform: none;
    }
  }
}
</style>
