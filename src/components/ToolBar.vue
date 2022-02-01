<template>
  <div class="toolbar">
    <div class="button" v-for="item in menu" :key="item.name">
      <IconButton
        :name="item.icon"
        :onClick="item.handler"
        :color="'primary'"
      />
    </div>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: "ToolBar",
  components: {
    IconButton,
  },
  props: {
    menu: Array,
  },
};
</script>

<style scoped>
.toolbar {
  position: absolute;
  right: 10px;
  bottom: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.button {
  margin-top: 4px;
}
</style>
