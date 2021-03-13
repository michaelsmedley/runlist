<template>
  <ul class="c-inline-list" :class="{ 'is-column': isColumn }">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "BaseInlineList",
  props: {
    isColumn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-inline-list {
  list-style: none;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  &.is-column {
    grid-template-columns: 1fr;
  }
}
</style>
