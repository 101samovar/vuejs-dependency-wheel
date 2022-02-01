<template>
  <div class="icon-button" :class="color">
    <Icon :name="name" @click="onClick" />
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  name: "IconButton",
  props: {
    name: String,
    color: String,
    onClick: Function,
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.icon-button {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  box-sizing: border-box;
  padding: 6px;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.icon-button:hover {
  opacity: 1;
}
.icon-button.primary:hover {
  box-shadow: 0 0 6px rgba(178, 255, 89, 0.16),
    0 3px 6px rgba(178, 255, 89, 0.75);
}
.icon-button.default:hover {
  box-shadow: 0 0 6px rgba(179, 136, 255, 0.16),
    0 3px 6px rgba(179, 136, 255, 0.75);
}

.default {
  fill: #b388ff;
}
.primary {
  fill: #b2ff59;
}
</style>
