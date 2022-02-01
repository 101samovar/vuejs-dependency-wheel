<template>
  <div class="chart-container">
    <div class="chart-title">{{ selected.name }}</div>
    <dependency-wheel
      :list="list"
      :id="selected.id"
      @set-selected="setSelected"
      @select-chart="selectChart"
    />
  </div>
  <Details
    :selected="selected"
    @input="onInput"
    @hide="hideDetails"
    :isVisible="detailsIsVisible"
  />
  <ToolBar :menu="menu" />
</template>

<script>
import DependencyWheel from "./DependencyWheel.vue";
import Details from "./Details.vue";
import Repository from "../Repository";
import ToolBar from "./ToolBar.vue";
import Router from "../Router";

export default {
  name: "Chart",
  components: {
    DependencyWheel,
    Details,
    ToolBar,
  },
  methods: {
    selectChart() {
      this.selected = this.chart;
      this.showDetails();
    },
    setSelected(id) {
      this.showDetails();
      const item = this.list.find((x) => x.id === id);
      this.selected = item;
      this.description = item.description;
      if (this.from && item.type === "element") {
        Repository.add({
          name: "New link",
          parent: this.parent,
          type: "link",
          from: this.from,
          to: this.selected.id,
        }).then(() => this.getData());
        this.from = null;
      }
    },
    onInput({key, value}) {
      let stamp = new Date().getTime();
      this.stamp[key] = stamp;
      let item = {id: this.selected.id};
      item[key] = value;
      this.selected[key] = value;
      ((s, i, k) => {
        window.setTimeout(() => {
          if (s === this.stamp[k]) {
            Repository.update(i).then(() => this.getData());
          }
        }, 1000);
      }) (stamp, item, key);
    },
    getChart() {
      Repository.getItem(this.parent).then((data) => {
        this.chart = data[0];
        this.selected = this.chart;
      });
    },
    getData() {
      Repository.getList({ parent: this.parent }).then((list) => {
        this.list = list;
        this.selected = this.selected || this.list[0] || this.chart;
      });
    },
    add() {
      Repository.add({
        name: "New element",
        parent: this.parent,
        type: "element",
      }).then(() => this.getData());
    },
    addLink() {
      this.from = this.selected.id;
    },
    showDetails() {
      this.detailsIsVisible = true;
    },
    hideDetails() {
      this.detailsIsVisible = false;
    },
    delete() {
      Repository.delete(this.selected.id).then(() => {
        if (this.selected.id === this.parent) {
          Router.setRoute('home');
        } else {
          this.selected = null;
          this.getData();
        }
      });
    },
  },
  data() {
    return {
      selected: {},
      chart: {},
      list: [],
      parent: null,
      from: null,
      detailsIsVisible: false,
      stamp: {},
      menu: [
        {
          icon: "delete",
          handler: this.delete,
        },
        {
          icon: "add",
          handler: this.add,
        },
        {
          icon: "route",
          handler: this.addLink,
        },
      ],
    };
  },
  beforeMount() {
    this.parent = +Router.params[0];
    this.getChart();
    this.getData();
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
.chart-title {
  position: absolute;
  top: 6px;
  left: 12px;
  font-weight: 100;
  font-size: 14px;
}
</style>
