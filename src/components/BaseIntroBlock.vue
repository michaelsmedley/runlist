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
  background: $color--primary;
  color: $color--secondary;
  padding: 5vmax 0;
}
</style>

<style lang="scss">
.c-intro-block {
  &.overlap {
    margin-bottom: 0;
    + * {
      position: relative;
      transform: translateY(-50%);
    }
  }
}
</style>
