<template>
  <div class="card-list">
    <div
      class="card-container"
      v-for="item in list"
      :key="item.id"
      @click="setSelected(item)"
    >
      <div
        class="card"
        @dblclick="openChart(item.id)"
        :class="{ selected: item.id === selected.id }"
      >
        <div class="title">{{ item.name }}</div>
        <div class="description">{{ item.description }}</div>
        <div class="id">{{ item.id }}</div>
      </div>
    </div>
  </div>
  <ToolBar :menu="menu" />
</template>

<script>
import Repository from "../Repository";
import ToolBar from "./ToolBar.vue";
import router from "../Router";

export default {
  name: "Home",
  methods: {
    setSelected(item) {
      this.selected = item;
    },
    openChart(id) {
      router.setRoute("chart", [id]);
    },
    getData() {
      Repository.getList({ type: "chart" }).then((data) => {
        this.list = data;
        this.selected = data[0];
      });
    },
    delete() {
      Repository.delete(this.selected.id).then(() => this.getData());
    },
    add() {
      Repository.add({
        name: "Sample Chart",
        description: "Just a sample chart",
        type: "chart",
      }).then(() => this.getData());
    },
  },
  components: {
    ToolBar,
  },
  data() {
    return {
      list: [],
      selected: {},
      menu: [
        {
          icon: "delete",
          handler: this.delete,
        },
        {
          icon: "add",
          handler: this.add,
        },
      ],
    };
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
}
.card-container {
  width: 33.3333%;
  padding: 6px;
  box-sizing: border-box;
}
.card {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 132px;
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.id {
  position: absolute;
  right: 0;
  bottom: -20px;
  opacity: 0.03;
  font-weight: 100;
  font-size: 72px;
}
.card:hover {
  box-shadow: 0 0 6px rgba(179, 136, 255, 0.16),
    0 3px 6px rgba(179, 136, 255, 0.75);
}
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
.description {
  font-size: 10px;
  opacity: 0.5;
}
.selected {
  background: #4a148c;
  color: white;
}
</style>
