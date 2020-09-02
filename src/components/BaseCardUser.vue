<template>
  <div class="c-card--user">
    <span class="c-card--user__img">
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
.c-card--user {
  display: inline-flex;
  gap: 10px;
  justify-items: flex-end;

  @include media(">=md") {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__img {
    grid-column: 1;
  }

  &__name {
    color: $brand__white;
    display: none;

    @include media(">=md") {
      display: inline;
      grid-column: span 3;
    }
  }
}
</style>
