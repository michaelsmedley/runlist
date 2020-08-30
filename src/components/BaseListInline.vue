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
  margin: 2vmax auto;
  max-width: 500px;
  text-align: left;
  width: 90vw;

  li {
    border-bottom: 1px solid lightblue;
    display: block;
    padding: 2vmax 0;
  }
}
</style>
