export function Grid(prefix, self) {
  return self.wrapComponent({

    template: `<g>
        <line
          v-for="(line,index) in horizontalLines"
          :key="line.key"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :style="line.style"
        ></line>
        <line
          v-for="(line,index) in verticalLines"
          :key="line.key"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :style="line.style"
        ></line>
      </g>`,

    data() {
      return window.elastiganttStore.initStore(prefix, 'Grid', {});
    },
    methods: {

    },
    computed: {
      verticalLines() {
        let lines = [];
        for (let step = 0; step < this.shared.times.steps; step++) {
          let x = step * this.shared.times.stepPx;
          console.log(x);
          lines.push({
            key: step,
            x1: x,
            y1: 0,
            x2: x,
            y2: '100%',
            style: this.shared.verticalGrid.style
          });
        }
        return lines;
      },
      horizontalLines() {
        let lines = [];
        for (let [index, task] of this.shared.tasks.entries()) {
          lines.push({
            key: 'hl' + task.key,
            x1: 0,
            y1: index * (this.shared.row.height + this.shared.horizontalGrid.gap) + this.shared.horizontalGrid.gap / 2,
            x2: '100%',
            y2: index * (this.shared.row.height + this.shared.horizontalGrid.gap) + this.shared.horizontalGrid.gap / 2,
            style: this.shared.horizontalGrid.style
          });
        }
        return lines;
      }
    }
  });
}