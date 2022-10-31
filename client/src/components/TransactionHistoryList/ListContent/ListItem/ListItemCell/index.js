import Component from '@/base/component';
import controller from '@/controller';

export default class ListItemCell extends Component {
  constructor(parentNode, transactionHistory) {
    super(
      parentNode,
      'div',
      {
        class: 'transaction-history-item__cell',
        'data-id': transactionHistory.id,
      },
      null,
      { transactionHistory },
    );
    this.activate();
  }
  render() {
    const {
      transactionHistory: {
        categoryTitle,
        categoryColor,
        title,
        paymentMethodTitle,
        isIncome,
        amount,
      },
    } = this.props;
    this.currentNode.innerHTML = `
      <div class="transaction-history-item__category" style="background: ${categoryColor}">${categoryTitle}</div>
      <span class="transaction-history-item__title">${title}</span>
      <span class="transaction-history-item__payment-method">${
        paymentMethodTitle || ''
      }</span>
      <span class="transaction-history-item__money">${
        isIncome ? '' : '-'
      }${amount.toLocaleString()}원</span>
    `;
  }

  activate() {
    this.addEvent('click', '.transaction-history-item__cell', () =>
      controller.setInputBarEditMode(this.props.transactionHistory),
    );
  }
}
