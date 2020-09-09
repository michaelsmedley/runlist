<template>
  <ul class="c-inline-list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "BaseInlineList",
};
</script>

<style lang="scss" scoped>
.c-inline-list {
  list-style-type: none;
  margin: 2vmax 0;
  max-width: 90vw;
  padding: 0;
  text-align: left;
  width: 100%;
}
</style>
