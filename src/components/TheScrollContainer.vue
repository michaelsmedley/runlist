<template>
  <div class="c-scroll-container">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.c-scroll-container {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  @media (min-width: 1024px) {
    scroll-snap-type: none;
  }
}
</style>
