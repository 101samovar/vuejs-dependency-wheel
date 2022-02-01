<template>
  <Header :onClick="toggleMenu" />
  <LeftMenu :isVisible="isMenuVisible" @mouseleave="hideMenu()" />
  <Breadcrumbs />
  <Content />
</template>

<script>
import Header from "./components/Header.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import Content from "./components/Content.vue";
import Router from "./Router";
import routes from "./routes";

export default {
  name: "App",
  setup() {
    Router.init(routes);
  },
  components: {
    Header,
    LeftMenu,
    Breadcrumbs,
    Content,
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    hideMenu() {
      this.isMenuVisible = false;
    },
  },
  data() {
    return {
      isMenuVisible: false,
    };
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #121212;
  color: white;
}
</style>
