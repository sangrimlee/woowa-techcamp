import Component from '@/base/component';
import { getYearAndMonthAndDate, getDayName } from '@/utils/date-util';

export default class ListItemHeader extends Component {
  constructor(
    parentNode,
    listItemHeaderData,
    props = { isHideIncomeAndSpent: false },
  ) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-item__header' },
      listItemHeaderData,
      props,
    );
    this.activate();
  }
  render(listItemHeaderData) {
    const { isHideIncomeAndSpent } = this.props;
    const { dateString, totalIncomeAmount, totalSpentAmount } =
      listItemHeaderData;
    const dateTemplate = this.getDateTemplate(new Date(dateString));
    const totalAmountTemplate = this.getTotalAmountTemplate(
      totalIncomeAmount,
      totalSpentAmount,
    );
    this.currentNode.innerHTML = isHideIncomeAndSpent
      ? dateTemplate
      : dateTemplate + totalAmountTemplate;
  }

  getDateTemplate(dateObj) {
    const { month, date } = getYearAndMonthAndDate(dateObj);
    const dayName = getDayName(dateObj);
    return `
      <h4 class="transaction-history-item__date">
        ${month}월 ${date}일
        <span class="transaction-history-item__day-name">${dayName}<span>
      </h4>
    `;
  }

  getTotalAmountTemplate(totalIncomeAmount, totalSpentAmount) {
    const totalIncomeText = totalIncomeAmount
      ? `수입 ${totalIncomeAmount.toLocaleString()}`
      : '';
    const totalSpentText = totalSpentAmount
      ? `지출 ${totalSpentAmount.toLocaleString()}`
      : '';
    return `
      <div class="transaction-history-item__total-amount">
        <span>${totalIncomeText}</span>
        <span>${totalSpentText}</span>
      </div>`;
  }
}
