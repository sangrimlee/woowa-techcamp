import Component from '@/base/component';
import controller from '@/controller';
import checkIcon from '@/assets/check.svg';

export default class ListFilter extends Component {
  constructor(
    parentNode,
    filterOptions,
    { totalIncomeAmount, totalSpentAmount },
  ) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-list__filter-container' },
      filterOptions,
      { totalIncomeAmount, totalSpentAmount },
    );
    this.activate();
  }
  render(filterOptions) {
    const { totalIncomeAmount, totalSpentAmount } = this.props;
    this.currentNode.innerHTML = `
      <input  hidden type="checkbox" id="income-checkbox"
        class="filter-input" ${filterOptions.income ? 'checked' : ''}/>
      <label for="income-checkbox" class="filter-label">
        <div class="filter-label__checkbox">${checkIcon}</div>
        <span class="filter-label__text">수입 ${totalIncomeAmount.toLocaleString()}원</span>
      </label>

      <input hidden type="checkbox" id="spent-checkbox"
        class="filter-input" ${filterOptions.spent ? 'checked' : ''}/>
      <label for="spent-checkbox" class="filter-label">
        <div class="filter-label__checkbox">${checkIcon}</div>
        <span class="filter-label__text">지출 ${totalSpentAmount.toLocaleString()}원</span>
      </label>
    `;
  }

  activate() {
    this.addEvent('change', '#income-checkbox', (event) =>
      controller.changeFilterOptions('income', event.target.checked),
    );
    this.addEvent('change', '#spent-checkbox', (event) =>
      controller.changeFilterOptions('spent', event.target.checked),
    );
  }
}
