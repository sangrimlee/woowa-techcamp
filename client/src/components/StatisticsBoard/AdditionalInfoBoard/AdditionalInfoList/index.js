import Component from '@/base/component';
import ListItem from '@/components/TransactionHistoryList/ListContent/ListItem';
import { STORE_KEYS } from '@/constants/keys';
import { makeSortedTransactionHistoryGroupbyDate } from '@/utils/transaction-history-util';

export default class AdditionalInfoList extends Component {
  constructor(parentNode, props) {
    super(
      parentNode,
      'section',
      { class: 'additional-into-list' },
      null,
      props,
    );
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const { category } = this.props;
    const filteredData = transactionHistories.filter(
      ({ categoryTitle }) => categoryTitle === category,
    );
    makeSortedTransactionHistoryGroupbyDate(filteredData, {
      income: false,
      spent: true,
    }).forEach((data) => {
      new ListItem(this.currentNode, data, { isHideIncomeAndSpent: true });
    });
  }
}
