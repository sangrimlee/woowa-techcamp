export default class Chart {
  constructor(canvas, dataset, options) {
    this.canvas = canvas;
    this.dataset = dataset;
    this.options = { aspectRatio: 1, ...options };
    this.context = this.canvas.getContext('2d');
    this.canvas.height = this.canvas.width * this.options.aspectRatio;
    this.setDatabaseKey();
  }

  setDatabaseKey() {
    const originKey = {
      label: 'label',
      value: 'value',
      color: 'color',
    };
    this.key = {
      ...originKey,
      ...this.options.key,
    };
  }

  getData(dataset, key) {
    const data = {
      label: dataset[this.key.label],
      value: dataset[this.key.value],
      color: dataset[this.key.color],
    };
    return key ? data[key] : data;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {}

  startDraw(ratio = 1, func = (value) => value) {
    const startAnimation = () => {
      let t = 0;
      const animation = () => {
        t += ratio;
        this.draw(Math.min(1, func(t)));
        if (t < 1) {
          requestAnimationFrame(animation);
        } else {
          this.draw(1);
        }
      };
      return animation;
    };
    startAnimation()();
  }
}
