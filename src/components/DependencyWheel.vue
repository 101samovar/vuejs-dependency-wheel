<template>
  <svg
    class="chart"
    ref="chart"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
  >
    <circle :cx="X0" :cy="Y0" :r="R" class="placeholder" @click="selectChart" />
    <path
      v-for="link in chart.links"
      :key="link.id"
      class="link"
      :class="{ selected: link.id === id }"
      :style="{ fill: link.color }"
      :d="link.path"
      @click="setSelected(link.id)"
    />
    <path
      v-for="element in chart.elements"
      :key="element.id"
      class="line"
      :class="{ selected: element.id === id }"
      :style="{ stroke: element.color }"
      :d="element.path"
      @click="setSelected(element.id)"
    />
    <text
      v-for="caption in chart.captions"
      class="captions"
      :x="caption.x"
      :y="caption.y"
      :key="caption.id"
      :style="{ textAnchor: caption.align }"
      @click="setSelected(caption.id)"
    >
      {{ caption.name }}
    </text>
    <path
      v-for="captionLink in chart.captionLinks"
      :key="captionLink.id"
      :d="captionLink.path"
      class="caption-link"
    />
  </svg>
</template>

<script>
import DW from "./dependency-wheel";

export default {
  name: "DependencyWheel",
  props: {
    selectedId: Number,
    list: Array,
    id: Number,
  },
  emits: ["set-selected", "select-chart"],
  methods: {
    setSelected(item) {
      this.$emit("set-selected", item);
    },
    selectChart() {
      this.$emit("select-chart");
    },
  },
  data() {
    return {
      width: 520,
      height: 240,
      X0: 260,
      Y0: 120,
      R: 90,
    };
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    chart() {
      return DW.get(
        {
          width: this.width,
          height: this.height,
          R: this.R,
          X0: this.X0,
          Y0: this.Y0,
        },
        this.list
      );
    },
  },
  mounted() {
    const rect = this.$refs.chart.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.R = (this.height * 4) / 9;
    this.X0 = this.width / 2;
    this.Y0 = this.height / 2;
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
}
.line {
  fill: none;
  stroke-width: 6px;
  cursor: pointer;
}
.link {
  stroke: none;
  fill-opacity: 0.3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.link:hover {
  fill-opacity: 1;
}
.captions {
  font-size: 8px;
  cursor: pointer;
  fill: #b9f6ca;
  opacity: 0.75;
  text-anchor: end;
}
.captions:hover {
  opacity: 1;
}
.placeholder {
  cursor: pointer;
  stroke-width: 30px;
  stroke: #b9f6ca;
  fill: black;
  stroke-opacity: 0.3;
  paint-order: stroke;
}
.placeholder:hover {
  opacity: 1;
}
.caption-link {
  fill: none;
  stroke: #b9f6ca;
  stroke-width: 1;
  stroke-opacity: 0.5;
}
.selected {
  animation: pulse infinite 1s linear;
}
@keyframes pulse {
  0% {
    stroke-width: 6px;
    stroke-opacity: 1;
  }
  100% {
    stroke-width: 30px;
    stroke-opacity: 0;
  }
}
</style>
