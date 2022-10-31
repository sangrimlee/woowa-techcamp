import Chart from '@/base/chart';

export default class DoughnutChart extends Chart {
  draw(t) {
    this.clear();
    const radius = this.canvas.width / 2;
    const totalValue = this.getTotalValue();

    let prevAngle = this.options.doughnutChartStartAngle;
    for (const data of this.dataset) {
      const { value, color } = this.getData(data);
      const currentAngle = prevAngle + (value / totalValue) * 2 * Math.PI * t;
      this.context.beginPath();
      this.context.arc(radius, radius, radius, prevAngle, currentAngle);
      prevAngle = currentAngle;
      this.context.lineTo(radius, radius);
      this.context.fillStyle = color;
      this.context.fill();
    }

    this.clearCircle(radius, radius, radius * 0.5);
  }

  clearCircle(x, y, radius) {
    this.context.save();
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.context.clip();
    this.context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    this.context.restore();
  }

  getTotalValue() {
    return this.dataset.reduce(
      (prev, data) => prev + this.getData(data, 'value'),
      0,
    );
  }
}
