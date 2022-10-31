import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import { calculateTotalAmount } from '@/utils/transaction-history-util';

export default class CalendarFooter extends Component {
  constructor(parentNode) {
    super(parentNode, 'tfoot', { class: 'calendar-footer' }, null);
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const { totalIncomeAmount, totalSpentAmount } =
      calculateTotalAmount(transactionHistories);
    this.currentNode.innerHTML = `
      <tr class="calendar-footer__income">
        <th>총 수입</th>
        <td>${totalIncomeAmount.toLocaleString()}원</td>
      </tr>
      <tr class="calendar-footer__spent">
        <th>총 지출</th>
        <td>${totalSpentAmount.toLocaleString()}원</td>
      </tr>
      <tr class="calendar-footer__total">
        <th>총계</th>
        <td>${(totalIncomeAmount - totalSpentAmount).toLocaleString()}원</td>
      </tr>
    `;
  }
}
