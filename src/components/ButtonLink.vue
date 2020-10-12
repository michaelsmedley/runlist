<template>
  <component
    :href="href"
    :target="target"
    :rel="rel"
    class="link--btn"
    :class="{ primary: primary, secondary: isSecondary }"
    :is="componentType"
  >
    <!-- @slot content to display in the button -->
    <slot />
  </component>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    href: {
      type: String,
      default: null,
      required: true,
    },
    target: {
      type: String,
      default: "_self",
      required: true,
    },
    rel: {
      type: String,
      default: "noopener nofollow",
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: true,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    componentType() {
      return this.isExternal ? "a" : "router-link";
    },
  },
};
</script>

<style lang="scss" scoped>
.link--btn {
  @apply rounded-full font-bold tracking-widest py-1 px-5 relative inline-block z-10 overflow-hidden;
  font-size: 1rem;

  &:before {
    @apply absolute top-0 left-0 bg-gradient-to-br h-full from-green-500 to-blue-500 transition-all ease-linear duration-200 block;
    z-index: -1;
    content: "";
    width: 200%;
  }

  &:hover {
    &:before {
      left: -100%;
    }
  }
}
</style>
