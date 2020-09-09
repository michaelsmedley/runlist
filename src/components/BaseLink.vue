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
a {
  text-decoration: underline;

  &.pill {
    @include font-size(1rem);
    border-radius: 20px;
    color: $brand__primary;
    display: inline-block;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    text-decoration: none;
    transition: all ease-in-out 0.2s;

    &:hover {
      color: $brand__secondary;
    }
    &.primary {
      color: $brand__white;
      overflow: hidden;
      position: relative;
      z-index: 1;

      &:after {
        content: "";
        background-image: linear-gradient(
          to right,
          $brand__primary 0%,
          $brand__tertiary 100%
        );
        display: block;
        height: 100%;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all ease-in-out 0.2s;
        width: 400%;
        z-index: -1;
      }

      &:hover {
        &:after {
          transform: translateX(-50%);
        }
      }
    }
    &.secondary {
      background: $brand__tertiary;
      color: $brand__white;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
  }
}
</style>
