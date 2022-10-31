import './index.css';
import Component from '@/base/component';
import LineChart from './LineChart';
import { easeOut } from '@/utils/chart-util';

export default class LineChartBoard extends Component {
  constructor(parentNode, categoryChartData) {
    super(
      parentNode,
      'section',
      { class: 'line-chart-board' },
      categoryChartData,
    );
  }

  render(categoryChartData) {
    const { category: categoryTitle, data: monthAndSpents } = categoryChartData;
    this.currentNode.innerHTML = `
      <h3 class="line-chart__title">${categoryTitle} 카테고리 소비 추이</h3>
      <canvas class="line-chart" width="750"></canvas>
    `;
    const lineChart = this.currentNode.querySelector('.line-chart');
    new LineChart(lineChart, monthAndSpents, {
      aspectRatio: 0.5,
      cellPerUnit: 3,
      chartAreaRatio: 0.88,
    }).startDraw(0.025, easeOut);
  }
}
