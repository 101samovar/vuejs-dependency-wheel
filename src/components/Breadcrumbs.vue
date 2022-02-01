<template>
  <div class="breadcrumbs">
    <span
      v-for="route in list"
      :key="route"
      class="link"
      @click="setRoute(route)"
      >{{ route }} /
    </span>
  </div>
</template>

<script>
import Router from "../Router";

export default {
  name: "Breadcrumbs",
  data() {
    return {
      list: [],
    };
  },
  methods: {
    setRoute(route) {
      Router.setRoute(route);
    },
    getRoutes() {
      const route = Router.route;
      this.list = ["home"];
      if (route !== "" && route !== "home") {
        this.list.push(route);
      }
    },
  },
  beforeMount() {
    Router.subscribe(this.getRoutes);
  },
};
</script>

<style scoped>
.breadcrumbs {
  position: absolute;
  left: 0;
  top: 42px;
  right: 0;
  height: 24px;
  padding: 8px 12px;
  font-size: 12px;
  color: #b39ddb;
}
.link {
  opacity: 0.5;
  cursor: pointer;
}
.link:hover {
  opacity: 1;
}
</style>
