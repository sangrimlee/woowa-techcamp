import './index.css';
import Component from '@/base/component';
import ListHeader from './ListHeader';
import { STORE_KEYS } from '@/constants/keys';
import ListContent from './ListContent';
import { calculateTotalAmount } from '@/utils/transaction-history-util';

export default class TransactionHistoryList extends Component {
  constructor(parentNode) {
    super(parentNode, 'section', {
      class: 'transaction-history-list-container',
    });
    this.activate();
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    this.currentNode.innerHTML = '';
    const listHeaderData = calculateTotalAmount(transactionHistories);
    new ListHeader(this.currentNode, listHeaderData);
    new ListContent(this.currentNode, transactionHistories);
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }
}
