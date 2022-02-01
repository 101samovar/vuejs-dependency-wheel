<template>
  <div class="details" :class="{ visible: isVisible }">
    <h2>Details #{{ selected.id }}</h2>
    <h3 class="">{{ selected.type }}</h3>
    <div class="close-button">
      <IconButton name="close" @click="$emit('hide')" :color="'default'" />
    </div>
    <form @submit.prevent="onSubmit">
      <div class="form-field">
        <label>Name</label>
        <input
          :value="selected.name"
          @input="$emit('input', { key: 'name', value: $event.target.value })"
          type="text"
        />
        <label>Description</label>
        <textarea
          rows="3"
          :value="selected.description"
          @input="
            $emit('input', { key: 'description', value: $event.target.value })
          "
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: "Details",
  props: {
    selected: Object,
    isVisible: Boolean,
  },
  components: { IconButton },
  emits: ["input", "hide"],
};
</script>

<style scoped>
.details {
  position: absolute;
  border-radius: 3px;
  right: -170px;
  width: 160px;
  top: 0;
  background: #212121;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  box-sizing: border-box;
  padding: 6px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.details.visible {
  right: 0;
}
h2,
h3 {
  font-weight: 100;
  margin: 0;
  padding: 0;
  opacity: 0.3;
}
h2 {
  font-size: 14px;
}
h3 {
  font-size: 10px;
}
input,
textarea {
  border: none;
  background: #212121;
  border-bottom: solid 1px #b39ddb;
  opacity: 1;
  width: 100%;
  box-sizing: border-box;
  color: white;
}
label {
  color: #b39ddb;
  font-size: 10px;
}
.close-button {
  position: absolute;
  right: 6px;
  top: 6px;
}
</style>
