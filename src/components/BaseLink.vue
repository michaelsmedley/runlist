<template>
  <a :href="href" :target="target" :rel="rel" :class="generateClass">
    <slot />
  </a>
</template>

<script>
export default {
  name: "BaseLink",
  props: {
    href: {
      type: String,
      default: null,
      required: true,
    },
    target: {
      type: String,
      default: "_self",
      required: false,
      validator: function(val) {
        return ["_blank", "_self", "_parent", "_top"].indexOf(val) !== -1;
      },
    },
    rel: {
      type: String,
      default: "noopener nofollow",
      required: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },

    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    generateClass() {
      let classString = [];

      if (this.pill) {
        classString.push("pill");
      }

      if (this.primary) {
        classString.push("primary");
      }

      return classString.join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
