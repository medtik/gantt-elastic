<template>
  <g
    class="gantt-elastic__tree-row-bar-wrapper gantt-elastic__tree-row-task-wrapper"
    :style="root.style('tree-row-bar-wrapper', 'tree-row-task-wrapper', task.style['tree-row-bar-wrapper'])"
    @mouseover="treeRowMouseOver"
    @mouseout="treeRowMouseOut"
  >
    <svg
      class="gantt-elastic__tree-row-bar gantt-elastic__tree-row-task"
      :style="root.style('tree-row-bar','tree-row-task',task.style['tree-row-bar'])"
      :x="task.x"
      :y="task.y"
      :width="task.width"
      :height="task.height"
      @click="treeRowClick"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="clipPathId">
          <polygon :points="getPoints"></polygon>
        </clipPath>
      </defs>
      <polygon
        class="gantt-elastic__tree-row-bar-polygon gantt-elastic__tree-row-task-polygon"
        :style="root.style('tree-row-bar-polygon', 'tree-row-task-polygon' , task.style['base'], task.style['tree-row-bar-polygon'])"
        :points="getPoints"
      ></polygon>
      <progress-bar :task="task" :clip-path="'url(#'+clipPathId+')'"></progress-bar>
    </svg>
    <tree-text :task="task" v-if="root.state.row.showText"></tree-text>
  </g>
</template>

<script>
import TreeText from "../Text.vue";
import ProgressBar from "../ProgressBar.vue";
export default {
  components: {
    TreeText,
    ProgressBar
  },
  inject: ["root"],
  props: ["task"],
  data () {
    return {};
  },
  computed: {
    clipPathId () {
      return "gantt-elastic__task-clip-path-" + this.task.id;
    },
    getViewBox () {
      const task = this.task;
      return `0 0 ${task.width} ${task.height}`;
    },
    getGroupTransform () {
      return `translate(${this.task.x} ${this.task.y})`;
    },
    getPoints () {
      const task = this.task;
      return `0,0 ${task.width},0 ${task.width},${task.height} 0,${
        task.height
        }`;
    },
  },
  methods: {
    treeRowClick () {
      this.task.tooltip.visible = !this.task.tooltip.visible;
    },
    treeRowMouseOver () {

    },
    treeRowMouseOut () {

    }
  }
};
</script>
