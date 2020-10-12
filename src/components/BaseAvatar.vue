<template>
  <figure class="c-avatar">
    <img :src="src" :title="title" />
  </figure>
</template>

<script>
export default {
  name: "BaseAvatar",

  props: {
    src: {
      type: String,
      default: null,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
