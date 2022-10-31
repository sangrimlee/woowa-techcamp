import Component from '@/base/component';
import ListFilter from './ListFilter';
import { STORE_KEYS } from '@/constants/keys';

export default class ListHeader extends Component {
  constructor(parentNode, listHeaderData) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-list__header container' },
      null,
      { ...listHeaderData },
    );
    this.activate();
  }
  render(filterOptions) {
    if (!filterOptions) return;
    const {
      incomeHistoryCnt,
      spentHistoryCnt,
      totalIncomeAmount,
      totalSpentAmount,
    } = this.props;
    this.currentNode.innerHTML = this.makeTitleTemplate(
      filterOptions,
      incomeHistoryCnt,
      spentHistoryCnt,
    );
    new ListFilter(this.currentNode, filterOptions, {
      totalIncomeAmount,
      totalSpentAmount,
    });
  }

  makeTitleTemplate(filterOptions, incomeHistoryCnt, spentHistoryCnt) {
    let totalCnt = 0;
    if (filterOptions.income) totalCnt += incomeHistoryCnt;
    if (filterOptions.spent) totalCnt += spentHistoryCnt;
    return `
      <h1 class="transaction-history-list__title">전체내역 ${totalCnt}건</h1>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.FILTER_OPTIONS);
  }
}
