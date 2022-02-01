<template>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
  >
    <path v-bind:d="getPath(name)" />
  </svg>
</template>

<script>
import Icons from "../assets/icons";

export default {
  name: "Icon",
  props: {
    name: String,
  },
  methods: {
    getPath(name) {
      return Icons[name];
    },
  },
};
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
