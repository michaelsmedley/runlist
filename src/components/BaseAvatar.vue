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
.c-avatar {
  border-radius: 100%;
  height: 32px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 32px;

  img {
    height: 100%;
    @supports (object-fit: cover) {
      object-fit: cover;
    }
    width: 100%;

    @supports not (object-fit: cover) {
      height: auto;
      left: 0;
      position: absolute;
      top: 0;
    }
  }
}
</style>
