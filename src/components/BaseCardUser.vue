<template>
  <div class="c-card--user flex justify-between items-center gap-2">
    <span class="c-card--user__img rounded-full w-10 h-10 overflow-hidden inline-block ">
      <slot name="img" />
    </span>
    <span class="c-card--user__name">
      <slot />
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

</style>
