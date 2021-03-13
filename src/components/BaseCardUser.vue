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
.c-card {
  &--user {
    align-items: center;
    display: inline-flex;
    gap: 10px;
    justify-content: flex-end;
    margin-bottom: 0;

    * {
      margin-bottom: 0;
    }

    &__img {
      border-radius: 100%;
      display: inline-block;
      height: 50px;
      overflow: hidden;
      width: 50px;

      ::v-deep img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
