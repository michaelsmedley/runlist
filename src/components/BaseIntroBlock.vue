<template>
  <div class="c-intro-block" :class="{ 'is-large': isLarge, overlap: overlap }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseIntroBlock",
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    overlap: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-intro-block {
  background-image: linear-gradient(
    to right,
    $brand__primary 0%,
    $brand__secondary 100%
  );
  color: $brand__white;
  margin-bottom: 1rem;

  &.is-large {
    padding: 4rem 0;
  }

  &.overlap {
    margin-bottom: -2rem;

    @include media(">=md") {
      padding-bottom: 6rem;
    }
  }
}
</style>
