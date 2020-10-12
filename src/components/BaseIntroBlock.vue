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
  @apply bg-gradient-to-r from-green-500 to-green-300 text-white-500 mb-4;

  &.is-large {
    @apply py-16;
  }

  &.overlap {
    @apply -mb-8;

    @screen md {
      // @apply -mb-3;
    }
  }
}
</style>
