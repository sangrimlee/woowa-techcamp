import Component from '@/base/component';
import SpentList from './SpentList';
import DoughnutChart from './DoughnutChart';
import { STORE_KEYS } from '@/constants/keys';
import { getTotalSpentAmounts } from '@/utils/transaction-history-util';
import { easeOut } from '@/utils/chart-util';

export default class DoughnutChartBoard extends Component {
  constructor(parentNode, transactionHistories) {
    super(parentNode, 'section', { class: 'doughnut-chart-board' }, null, {
      transactionHistories,
    });
    this.activate();
  }

  render(categories) {
    if (!categories) return;
    const { transactionHistories } = this.props;
    this.currentNode.innerHTML = `
      <div class="doughnut-chart-board__chart">
        <canvas class="doughnut-chart"></canvas>
      </div>
      <div class="doughnut-chart-board__list"></div>
    `;
    const incomeCategories = categories.filter(
      (category) => !category.isIncome,
    );
    const totalSpentAmounts = getTotalSpentAmounts(
      transactionHistories,
      incomeCategories,
    );
    const key = {
      label: 'category',
      value: 'totalSpentAmount',
      color: 'color',
    };
    const chart = this.currentNode.querySelector('.doughnut-chart');
    const list = this.currentNode.querySelector('.doughnut-chart-board__list');
    const doughnutChartStartAngle = Math.random() * 2 * Math.PI;
    new DoughnutChart(chart, totalSpentAmounts, {
      key,
      scale: 0.8,
      innerRadius: 0.5,
      doughnutChartStartAngle,
    }).startDraw(0.025, easeOut);
    new SpentList(list, totalSpentAmounts);
  }

  activate() {
    this.subscribe(STORE_KEYS.CATEGORIES);
  }
}
