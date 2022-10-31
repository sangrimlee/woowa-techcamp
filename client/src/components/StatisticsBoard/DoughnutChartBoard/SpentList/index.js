import Component from '@/base/component';
import controller from '@/controller';

export default class SpentList extends Component {
  constructor(parentNode, initialData) {
    super(parentNode, 'ul', { class: 'spent-list' }, initialData);
    this.activate();
  }

  render(totalSpentAmounts) {
    const monthTotalSpentAmount = totalSpentAmounts.reduce(
      (prev, { totalSpentAmount }) => prev + totalSpentAmount,
      0,
    );
    this.currentNode.innerHTML = `
      <h3 class="spent-list__title">이번 달 지출 금액 ${monthTotalSpentAmount.toLocaleString()}</h3>
      ${totalSpentAmounts
        .map((totalSpentAmountData) =>
          this.getListItemTemplate(totalSpentAmountData, monthTotalSpentAmount),
        )
        .join('')}
      `;
  }

  getListItemTemplate(totalSpentAmountData, monthTotalSpentAmount) {
    const { id, title, color, totalSpentAmount } = totalSpentAmountData;
    const spentPercentage =
      monthTotalSpentAmount !== 0
        ? Math.round((totalSpentAmount / monthTotalSpentAmount) * 100)
        : 0;
    return `
      <li class="spent-list-item" data-id="${id}" data-title="${title}">
        <div class="spent-list-item__category" style="background: ${color}">${title}</div>
        <span class="spent-list-item__ratio">${spentPercentage}%</span>
        <span class="spent-list-item__spent">${totalSpentAmount.toLocaleString()}</span>
      </li>
    `;
  }

  activate() {
    this.addEvent('click', '.spent-list-item', (event) =>
      this.handleCategoryBadgeClick(event),
    );
  }

  handleCategoryBadgeClick(event) {
    const categoryTitle =
      event.target.closest('.spent-list-item').dataset.title;
    controller.setChartData(categoryTitle);
  }
}
