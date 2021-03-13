<template>
  <div class="c-scroll-child">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TheScrollChild",
};
</script>

<style lang="scss" scoped>
.c-scroll-child {
  display: flex;
  scroll-snap-align: start;
  min-width: 100%;
  padding: 0 calc((100% - $page-width) / 2);

  @media screen and (min-width: 1024px) {
    min-width: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
