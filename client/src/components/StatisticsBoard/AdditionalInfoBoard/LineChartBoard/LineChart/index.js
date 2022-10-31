import Chart from '@/base/chart';

export default class LineChart extends Chart {
  constructor(canvas, dataset, options) {
    super(canvas, dataset, options);
    this.init();
  }

  init() {
    this.cellSize = this.calculateCellSize();
    this.chartHeight = this.options.chartAreaRatio * this.canvas.height;
    this.dateDatas = this.dataset.map((value) => new Date(value.date));
    this.spentDatas = this.dataset.map((value) => parseInt(value.totalSpent));
  }

  calculateCellSize() {
    const cellNum = this.dataset.length * this.options.cellPerUnit;
    return { x: this.canvas.width / cellNum, y: this.canvas.height / cellNum };
  }

  draw(t) {
    this.clear();
    const vertices = this.getVertices();
    this.drawGrid();
    this.drawLineChart(vertices, t);
    this.drawVertices(vertices, t);
    this.drawAxisLable();
    if (t >= 1) {
      this.drawValueLabel(vertices);
    }
  }

  getVertices() {
    const yScaleConstant = this.calYScaleContant(0.8);
    const vertices = this.spentDatas.map((value, index) => [
      (this.options.cellPerUnit * index + 1) * this.cellSize.x,
      this.chartHeight - yScaleConstant * value,
    ]);
    return vertices;
  }

  calYScaleContant(lengthRatio) {
    const maxSpent = Math.max(...this.spentDatas) || 1;
    return (lengthRatio / maxSpent) * this.canvas.height;
  }

  drawGrid() {
    const grid = new Path2D();
    for (let xPos = 0; xPos <= this.canvas.width; xPos += this.cellSize.x) {
      grid.moveTo(xPos, 0);
      grid.lineTo(xPos, this.chartHeight);
    }
    for (let yPos = 0; yPos <= this.chartHeight; yPos += this.cellSize.y) {
      grid.moveTo(0, yPos);
      grid.lineTo(this.canvas.width, yPos);
    }
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#f5f5f5';
    this.context.stroke(grid);
  }

  drawAxisLable() {
    this.context.font = '1rem sans-serif';
    this.context.fillStyle = '#8d9393';
    const unitSize = this.cellSize.x * this.options.cellPerUnit;
    for (let xPos = 0; xPos < this.canvas.width; xPos += unitSize) {
      const index = xPos / unitSize;
      const dateString = `${this.dateDatas[index].getMonth() + 1}월`;
      const labelXPos = xPos + this.cellSize.x * 0.6;
      const labelYPos = this.chartHeight + this.cellSize.y * 2;
      this.context.fillText(dateString, labelXPos, labelYPos);
    }
  }

  drawValueLabel(vertices) {
    this.context.font = '1.25rem sans-serif';
    this.context.fillStyle = '#626666';
    vertices.forEach((vertex, index) => {
      const [xPos, yPos] = vertex;
      const valueString = this.spentDatas[index].toLocaleString();

      this.context.fillText(
        valueString,
        xPos - this.cellSize.x / 2,
        yPos - this.cellSize.y / 2,
      );
    });
  }

  drawLineChart(vertices, t) {
    this.context.beginPath();
    this.context.moveTo(...this.calCurrentPos(vertices[0], t));

    for (const vertex of vertices) {
      const [xPos, yPos] = this.calCurrentPos(vertex, t);
      this.context.lineTo(xPos, yPos);
    }
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#2AC1BC';
    this.context.stroke();
  }

  drawVertices(vertices, t) {
    this.context.beginPath();
    for (const vertex of vertices) {
      const [xPos, yPos] = this.calCurrentPos(vertex, t);
      this.context.moveTo(xPos, yPos);
      this.context.arc(xPos, yPos, 6, 0, 2 * Math.PI);
    }
    this.context.fillStyle = '#2AC1BC';
    this.context.fill();
  }

  calCurrentPos(vertex, ratio) {
    const [xPos, yPos] = vertex;
    const currentYPos = yPos * ratio + (this.canvas.height / 2) * (1 - ratio);
    return [xPos, currentYPos];
  }
}
