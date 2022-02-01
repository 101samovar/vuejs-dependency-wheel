<template>
  <div class="container">
    <component :is="component" />
  </div>
</template>

<script>
import Router from "../Router";

export default {
  name: "Content",
  data() {
    return {
      route: "",
    };
  },
  computed: {
    component() {
      return Router.routes[this.route];
    },
  },
  beforeMount() {
    Router.subscribe(() => (this.route = Router.route));
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 72px;
  bottom: 0;
  overflow: auto;
}
</style>
