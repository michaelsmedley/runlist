<template>
  <article class="cta">
    <header class="bg-gradient-to-r from-green-500 to-blue-500 h-12">
      <div class="icon w-16 h-16 absolute bottom-0 bg-gradient-to-r from-green-500 to-green-300 rounded-full flex items-center justify-center">
        <slot name="icon" />
      </div>
    </header>
    <main>
      <slot />
    </main>
  </article>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cta {
  @apply bg-white-500 shadow-subtle rounded-sm overflow-hidden;
  header {
    @apply relative mb-4;
    &:before {
      @apply absolute left-0 w-full h-full bg-white-500;
      content: "";
      top: -1px;
    }

    .icon {
      transform: translateY(50%);
      left: 1.5rem;
    }
  }

  main {
    @apply py-10 px-6;
  }
}
</style>
