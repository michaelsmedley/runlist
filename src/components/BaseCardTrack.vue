<template>
  <button
    class="c-card"
    :class="{ 'c-card--track--row': asRow, 'c-card--track--no-hover': noHover }"
    @click="handleClick(track)"
  >
    <div class="c-card__img" :class="{ 'md-1': mini, 'md-2': !mini }">
      <picture>
        <source
          :srcset="track.album.images[0].url"
          media="(min-width: 768px)"
        />
        <img
          :src="track.album.images[1].url"
          :alt="`Image cover for ${track.name} by ${track.artists[0].name}`"
          loading="lazy"
        />
      </picture>
    </div>
    <div
      class="c-card--track__info u-ta-left"
      :class="{ 'w-7/12': !hidePreview, 'w-full md:w-7/12': hidePreview }"
    >
      <p>
        <strong>{{ track.artists[0].name }} - {{ track.name }}</strong>
      </p>
      <p>{{ track.album.name }}</p>
    </div>
    <div
      class="c-card--track__preview u-ta-right"
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
    asRow: {
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

  emits: ["click"],

  methods: {
    handleClick(track) {
      this.$emit("click", track);
    },
  },
};
</script>

<style lang="scss" scoped>
.c-card {
  align-items: center;
  background: $color--secondary;
  border: none;
  cursor: pointer;
  color: black;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
  text-align: left;

  > *,
  > * > * {
    margin-bottom: 0;
    width: 100%;
  }

  &:after {
    position: absolute;
    display: block;
    content: "";
    height: 1px;
    z-index: -1;
    bottom: -1px;
  }

  &__img {
    picture,
    img {
      min-width: 200px;
      min-height: 200px;
      width: 100%;
      height: auto;
    }
  }

  &--track--row {
    cursor: default;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 3fr 1fr;
    margin-bottom: 0;
    width: 100%;

    img,
    picture {
      min-width: auto;
      min-height: auto;
      max-width: 100px;
    }

    * {
      margin-bottom: 0;
    }
  }
}
</style>
