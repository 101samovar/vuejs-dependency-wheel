<template>
  <div class="header">
    <div class="button">
      <IconButton name="menu" @click="onClick" />
    </div>
    <div class="title">Dependency wheel</div>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: "Header",
  components: {
    IconButton,
  },
  props: {
    onClick: Function,
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  background: #4a148c;
  color: white;
  fill: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.title {
  font-size: 24px;
}
.button {
  padding: 3px;
}
</style>
