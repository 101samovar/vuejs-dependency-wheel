<template>
  <div
    class="left-menu"
    :class="{ visible: isVisible }"
    @mouseleave="$emit('mouseleave')"
  >
    <IconButton
      name="home"
      :onClick="() => onClick('home')"
      :color="'default'"
    />
    <IconButton
      name="help"
      :onClick="() => onClick('help')"
      :color="'default'"
    />
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";
import router from "../Router";

export default {
  name: "LeftMenu",
  components: {
    IconButton,
  },
  methods: {
    onClick(route) {
      router.setRoute(route);
    },
  },
  props: {
    isVisible: Boolean,
  },
  emits: ["mouseleave"],
};
</script>

<style scoped>
.left-menu {
  position: absolute;
  left: -60px;
  top: 42px;
  bottom: 0;
  width: 42px;
  box-sizing: border-box;
  padding: 3px;
  background: #212121;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.left-menu.visible {
  left: 0;
}
</style>
